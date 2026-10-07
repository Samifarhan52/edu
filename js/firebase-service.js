/**
 * The Edu Consultant - Firebase Cloud Database & Live Excel Integration Service
 * Configured for domain account: enquiry@theeduconsultant.com
 * 
 * Features:
 * 1. Automatic Cloud Firestore synchronization for Leads & Meetings
 * 2. Real-time Google Sheets / Live Excel Webhook streaming
 * 3. Offline-first resilience with local storage fallback
 * 4. Interactive connection testing and local-to-cloud batch migration
 */

(function (window) {
    'use strict';

    const STORAGE_KEY = 'theedu_firebase_config';
    const SHEETS_KEY = 'theedu_sheets_webhook_url';

    const EduFirebase = {
        app: null,
        db: null,
        status: 'unconfigured', // 'unconfigured' | 'connecting' | 'connected' | 'error'
        lastError: null,

        // Retrieve active configuration
        getConfig: function () {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (parsed && parsed.projectId) return parsed;
                }
            } catch (e) {}
            return window.EDU_FIREBASE_CONFIG || {};
        },

        // Save new configuration from Admin Dashboard
        saveConfig: function (cfg) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
                if (cfg.sheetsWebhookUrl) {
                    localStorage.setItem(SHEETS_KEY, cfg.sheetsWebhookUrl);
                }
                return this.init();
            } catch (e) {
                console.error('[EduFirebase] Failed to save config:', e);
                return false;
            }
        },

        getSheetsWebhookUrl: function () {
            const stored = localStorage.getItem(SHEETS_KEY);
            if (stored && stored.trim()) return stored.trim();
            const cfg = this.getConfig();
            return (cfg && cfg.sheetsWebhookUrl) ? cfg.sheetsWebhookUrl.trim() : '';
        },

        setSheetsWebhookUrl: function (url) {
            if (url) {
                localStorage.setItem(SHEETS_KEY, url.trim());
            } else {
                localStorage.removeItem(SHEETS_KEY);
            }
        },

        // Initialize Firebase SDK
        init: function () {
            const cfg = this.getConfig();
            if (!cfg || !cfg.projectId || !cfg.apiKey) {
                this.status = 'unconfigured';
                return false;
            }

            if (typeof window.firebase === 'undefined') {
                console.warn('[EduFirebase] Firebase SDK not loaded on this page.');
                this.status = 'error';
                this.lastError = 'Firebase SDK not loaded';
                return false;
            }

            try {
                this.status = 'connecting';
                // Check if an app is already initialized
                if (!window.firebase.apps || !window.firebase.apps.length) {
                    this.app = window.firebase.initializeApp(cfg);
                } else {
                    this.app = window.firebase.app();
                }
                this.db = window.firebase.firestore();
                this.status = 'connected';
                this.lastError = null;
                console.log(`%c[Firebase Cloud Connected]%c Project: ${cfg.projectId}`, 'color: #16a34a; font-weight: bold;', 'color: #333;');
                this.updateUiBadges();
                return true;
            } catch (err) {
                console.error('[EduFirebase] Init Error:', err);
                this.status = 'error';
                this.lastError = err.message || 'Initialization failed';
                this.updateUiBadges();
                return false;
            }
        },

        isConnected: function () {
            return this.status === 'connected' && !!this.db;
        },

        // Test Connection by writing and reading a heartbeat record
        testConnection: async function () {
            if (!this.isConnected()) {
                const initialized = this.init();
                if (!initialized) {
                    return { success: false, message: this.lastError || 'Firebase configuration missing or invalid.' };
                }
            }

            try {
                const testRef = this.db.collection('_healthcheck').doc('ping');
                const testData = {
                    service: 'The Edu Consultant Cloud Engine',
                    domainEmail: 'enquiry@theeduconsultant.com',
                    timestamp: window.firebase.firestore.FieldValue.serverTimestamp(),
                    clientTime: new Date().toISOString()
                };
                await testRef.set(testData, { merge: true });
                const doc = await testRef.get();
                if (doc.exists) {
                    this.status = 'connected';
                    this.updateUiBadges();
                    return { success: true, message: 'Successfully connected to Firebase Cloud Firestore!' };
                }
                return { success: false, message: 'Document written but could not be read back.' };
            } catch (err) {
                console.error('[EduFirebase] Connection Test Failed:', err);
                this.status = 'error';
                this.lastError = err.message;
                this.updateUiBadges();
                return { success: false, message: err.message || 'Firestore connection rejected. Check security rules and API key.' };
            }
        },

        // Save a Lead to Cloud Firestore & stream to Google Sheets / Live Excel
        saveLead: async function (leadData) {
            const cleanLead = Object.assign({}, leadData);
            const leadId = cleanLead.id || ('lead-' + Date.now());
            cleanLead.id = leadId;

            // 1. Stream to Live Google Sheet / Excel Webhook
            this.syncToGoogleSheet(cleanLead, 'lead').catch(function () {});

            // 2. Save to Cloud Firestore
            if (this.isConnected()) {
                try {
                    const docData = Object.assign({}, cleanLead, {
                        cloudUpdatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
                        domainAccount: 'enquiry@theeduconsultant.com'
                    });
                    await this.db.collection('leads').doc(leadId).set(docData, { merge: true });
                    console.log(`[EduFirebase] Lead ${leadId} synced to Firestore.`);
                } catch (e) {
                    console.warn('[EduFirebase] Could not save lead to Firestore:', e);
                }
            }
        },

        // Save a Meeting to Cloud Firestore & stream to Google Sheets / Live Excel
        saveMeeting: async function (meetingData) {
            const cleanMeeting = Object.assign({}, meetingData);
            const meetingId = cleanMeeting.id || ('MTG-' + Date.now());
            cleanMeeting.id = meetingId;

            // 1. Stream to Live Google Sheet / Excel Webhook
            this.syncToGoogleSheet(cleanMeeting, 'meeting').catch(function () {});

            // 2. Save to Cloud Firestore
            if (this.isConnected()) {
                try {
                    const docData = Object.assign({}, cleanMeeting, {
                        cloudUpdatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
                        domainAccount: 'enquiry@theeduconsultant.com'
                    });
                    await this.db.collection('meetings').doc(meetingId).set(docData, { merge: true });
                    console.log(`[EduFirebase] Meeting ${meetingId} synced to Firestore.`);
                } catch (e) {
                    console.warn('[EduFirebase] Could not save meeting to Firestore:', e);
                }
            }
        },

        // Fetch all leads from Cloud Firestore
        fetchCloudLeads: async function () {
            if (!this.isConnected()) return null;
            try {
                const snapshot = await this.db.collection('leads').orderBy('createdAt', 'desc').limit(200).get();
                const leads = [];
                snapshot.forEach(doc => {
                    leads.push(doc.data());
                });
                return leads;
            } catch (e) {
                console.warn('[EduFirebase] Error fetching cloud leads:', e);
                return null;
            }
        },

        // Fetch all meetings from Cloud Firestore
        fetchCloudMeetings: async function () {
            if (!this.isConnected()) return null;
            try {
                const snapshot = await this.db.collection('meetings').orderBy('createdAt', 'desc').limit(200).get();
                const meetings = [];
                snapshot.forEach(doc => {
                    meetings.push(doc.data());
                });
                return meetings;
            } catch (e) {
                console.warn('[EduFirebase] Error fetching cloud meetings:', e);
                return null;
            }
        },

        // Batch upload all local leads and meetings to Cloud Firestore
        syncLocalToCloud: async function () {
            if (!this.isConnected()) {
                return { success: false, message: 'Please connect Firebase Firestore first.' };
            }

            try {
                const localLeads = window.EduLeads ? window.EduLeads.getLeads() : [];
                const localMeetings = window.EduLeads ? window.EduLeads.getMeetings() : [];

                let uploadedLeads = 0;
                let uploadedMeetings = 0;

                const batch = this.db.batch();

                localLeads.forEach(lead => {
                    if (lead && lead.id) {
                        const ref = this.db.collection('leads').doc(lead.id);
                        batch.set(ref, Object.assign({}, lead, {
                            domainAccount: 'enquiry@theeduconsultant.com',
                            cloudMigratedAt: window.firebase.firestore.FieldValue.serverTimestamp()
                        }), { merge: true });
                        uploadedLeads++;
                    }
                });

                localMeetings.forEach(meeting => {
                    if (meeting && meeting.id) {
                        const ref = this.db.collection('meetings').doc(meeting.id);
                        batch.set(ref, Object.assign({}, meeting, {
                            domainAccount: 'enquiry@theeduconsultant.com',
                            cloudMigratedAt: window.firebase.firestore.FieldValue.serverTimestamp()
                        }), { merge: true });
                        uploadedMeetings++;
                    }
                });

                await batch.commit();

                return {
                    success: true,
                    message: `Successfully pushed ${uploadedLeads} leads and ${uploadedMeetings} meetings to Firebase Cloud Database!`
                };
            } catch (err) {
                console.error('[EduFirebase] Batch sync failed:', err);
                return { success: false, message: err.message || 'Batch upload failed.' };
            }
        },

        // Stream record to Google Sheet / Live Excel Webhook
        syncToGoogleSheet: async function (record, type) {
            const webhookUrl = this.getSheetsWebhookUrl();
            if (!webhookUrl) return false;

            const payload = {
                type: type || 'lead',
                id: record.id || '',
                timestamp: record.createdAt || new Date().toISOString(),
                dateFormatted: record.dateFormatted || new Date().toLocaleString(),
                name: record.name || '',
                phone: record.phone || '',
                email: record.email || '',
                destination: record.destination || record.country || '',
                service: record.service || record.topic || record.mode || '',
                message: record.message || record.notes || '',
                preferredDate: record.date || '',
                preferredTime: record.time || '',
                whatsappOptIn: record.whatsappOptIn ? 'YES' : 'NO',
                source: record.source || 'Website Lead',
                status: record.status || 'New',
                account: 'enquiry@theeduconsultant.com'
            };

            try {
                // Using no-cors mode to handle Google Apps Script 302 redirects seamlessly
                await fetch(webhookUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                console.log(`[EduFirebase] Record ${payload.id} streamed to Live Google Sheet / Excel.`);
                return true;
            } catch (err) {
                console.warn('[EduFirebase] Failed streaming to Google Sheet:', err);
                return false;
            }
        },

        // Update UI status badges across Admin Dashboard
        updateUiBadges: function () {
            const badge = document.getElementById('firebaseStatusBadge');
            const pill = document.getElementById('firebaseStatusPill');
            const statusText = document.getElementById('firebaseStatusText');
            const cfg = this.getConfig();

            if (this.isConnected()) {
                if (badge) {
                    badge.className = 'badge bg-success-subtle text-success border border-success-subtle fw-bold px-3 py-1.5 rounded-pill';
                    badge.innerHTML = '<i class="fa-solid fa-cloud-check me-1"></i> Firebase Cloud Connected';
                }
                if (pill) {
                    pill.className = 'd-inline-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill bg-success text-white fs-11 fw-bold';
                    pill.innerHTML = '<i class="fa-solid fa-circle text-white animate-pulse" style="font-size: 8px;"></i> Cloud Live';
                }
                if (statusText) {
                    statusText.textContent = `Connected to Project: ${cfg.projectId || 'Active'}`;
                }
            } else if (this.status === 'connecting') {
                if (badge) {
                    badge.className = 'badge bg-warning-subtle text-warning border border-warning-subtle fw-bold px-3 py-1.5 rounded-pill';
                    badge.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> Connecting to Cloud...';
                }
            } else {
                if (badge) {
                    badge.className = 'badge bg-secondary-subtle text-secondary border border-secondary-subtle fw-bold px-3 py-1.5 rounded-pill';
                    badge.innerHTML = '<i class="fa-solid fa-hard-drive me-1"></i> Local Storage & Hostinger Mode';
                }
                if (pill) {
                    pill.className = 'd-inline-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill bg-secondary text-white fs-11 fw-bold';
                    pill.innerHTML = '<i class="fa-solid fa-circle text-white-50" style="font-size: 8px;"></i> Local Mode';
                }
                if (statusText) {
                    statusText.textContent = 'Awaiting Firebase Configuration';
                }
            }

            // Also check Google Sheets status
            const sheetsBadge = document.getElementById('sheetsWebhookStatusBadge');
            const sheetsUrl = this.getSheetsWebhookUrl();
            if (sheetsBadge) {
                if (sheetsUrl) {
                    sheetsBadge.className = 'badge bg-success-subtle text-success border border-success-subtle fw-bold px-2.5 py-1 rounded-pill';
                    sheetsBadge.innerHTML = '<i class="fa-solid fa-file-excel me-1"></i> Live Excel Stream Active';
                } else {
                    sheetsBadge.className = 'badge bg-light text-muted border fw-bold px-2.5 py-1 rounded-pill';
                    sheetsBadge.innerHTML = '<i class="fa-solid fa-circle-pause me-1"></i> Webhook Not Configured';
                }
            }
        }
    };

    window.EduFirebase = EduFirebase;

    // Auto-init on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => EduFirebase.init());
    } else {
        EduFirebase.init();
    }
})(window);
