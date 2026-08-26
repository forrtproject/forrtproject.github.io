/**
 * FORRT feedback receiver (single Apps Script web app, multiple sources).
 * Appends one row per feedback event to a sheet in SHEET_ID, picking the
 * sheet/schema from `data.type`:
 *
 *   - JUST-OS chat feedback (no `type`, or `type: "chat"`):
 *     sheet "feedback" — { turn_id, rho_exp, signals:{copy,followup,fast_exit},
 *     comment, query, response, ts }
 *
 *   - Glossary entry feedback/suggestion form (`type: "glossary_feedback"`):
 *     sheet "glossary_feedback" — { term, url, language, feedback_type,
 *     message, email, ts }.
 *
 *   - Adopting Principled Education feedback form (`type: "adopting_feedback"`):
 *     sheet "adopting_feedback" — { tips_used, what_worked, demographics,
 *     demographics_other, additional_comments, url, ts }.
 *
 * Sheets are created automatically (with headers) on first submission.
 */

var SHEET_ID = '1YTDMUgBzHTy558M5u3ClrnwMnbKF_nxWn0ufLnqBJY4';
var SHEET_NAME = 'feedback';
var GLOSSARY_SHEET_NAME = 'glossary_feedback';
var ADOPTING_SHEET_NAME = 'adopting_feedback';

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (data.type === 'glossary_feedback') {
      return _handleGlossaryFeedback(data);
    }
    if (data.type === 'adopting_feedback') {
      return _handleAdoptingFeedback(data);
    }
    return _handleChatFeedback(data);
  } catch (err) {
    // Clients POST with `mode: 'no-cors'` and never read this response, so an
    // error here is otherwise invisible; returning it (rather than throwing)
    // at least leaves a trace in the Apps Script execution log.
    return _json({ ok: false, error: String(err) });
  }
}

function _handleChatFeedback(data) {
  var signals = data.signals || {};
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

  sheet.appendRow([
    new Date(),                 // received_at (server time)
    data.ts || '',              // ts (client epoch ms)
    data.turn_id || '',
    data.rho_exp,               // +1 | -1 | 0
    signals.copy ? 1 : '',
    signals.followup ? 1 : '',
    signals.fast_exit ? 1 : '',
    data.comment || '',
    data.query || '',
    data.response || '',
  ]);

  return _json({ ok: true });
}

function _handleGlossaryFeedback(data) {
  var sheet = _getOrCreateSheet(GLOSSARY_SHEET_NAME, [
    'received_at', 'ts', 'term', 'url', 'language', 'feedback_type', 'message', 'email',
  ]);

  sheet.appendRow([
    new Date(),                 // received_at (server time)
    data.ts || '',              // ts (client epoch ms)
    data.term || '',
    data.url || '',
    data.language || '',
    data.feedback_type || '',
    data.message || '',
    data.email || '',
  ]);

  return _json({ ok: true });
}

function _handleAdoptingFeedback(data) {
  var sheet = _getOrCreateSheet(ADOPTING_SHEET_NAME, [
    'received_at', 'ts', 'tips_used', 'what_worked', 'demographics', 'demographics_other', 'additional_comments', 'url',
  ]);

  sheet.appendRow([
    new Date(),                        // received_at (server time)
    data.ts || '',                     // ts (client epoch ms)
    data.tips_used || '',
    data.what_worked || '',
    // Demographics arrive as an array of checked values; flattened to a
    // single string since a spreadsheet cell can't hold a list.
    (data.demographics || []).join(', '),
    data.demographics_other || '',
    data.additional_comments || '',
    data.url || '',
  ]);

  return _json({ ok: true });
}

// Returns the named sheet in SHEET_ID, creating it with a header row if it
// doesn't exist yet.
function _getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

// Health check for GET requests.
function doGet() {
  return _json({ ok: true, service: 'FORRT Feedback Forms' });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
