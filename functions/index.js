const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const mailgun = require('mailgun-js')({apiKey: functions.config().mailgun.api_key, domain: functions.config().mailgun.domain});


exports.sendEmailInvite = functions.region('europe-west1').firestore
.document('invites/{email}')
.onCreate((_, context) => {
    const email = context.params.email;
    return mailgun.messages().send({
        to: email,
        from: `no-reply@${functions.config().mailgun.domain}`, // TODO, change domain
        subject: 'You have been invited to ScrollBar Tender site',
        template: 'invite_template'
    })
});

exports.sendShiftGrabbedConfirmation = functions.region('europe-west1').firestore.document('env/{_env}/engagements/{engagementId}')
.onUpdate(async (change) => {
    const engagementBefore = change.before.data();
    const engagementAfter = change.after.data();
    
    if (engagementBefore.userId !== engagementAfter.userId) {
        const tender = await db.collection('/users').doc(engagementBefore.userId).get();
        const tenderTakingShift = await db.collection('/users').doc(engagementAfter.userId).get();
        return mailgun.messages().send({
            to: tender.data().email,
            from: `no-reply@scrollbar.dk, scrollbar@${functions.config().mailgun.domain}`, // TODO, change domain
            subject: 'Your shift has been grabbed!',
            template: 'shift_taken',
            'h:X-Mailgun-Variables': JSON.stringify({name: tenderTakingShift.data().displayName}) 
        })
    }
    return;
});