"use strict";

let assert = require("assert");
let Gmail = require("../src/gmail").Gmail;

let testData = require("./testdata-parser.js");

describe("Response-parsing", () => {

    it("Handles JSON-responses consistently", () => {
        var gmail = new Gmail();
        var parsed = gmail.tools.parse_response(testData.parse_response_json_data);

        assert.equal(2, parsed.length);
        assert.equal(8, parsed[0].length);
        assert.equal(8, parsed[1].length);
    });

    it("Handles visible_emails_post consistently", () => {
        var gmail = new Gmail();
        var emails = gmail.helper.get.visible_emails_post(testData.visible_emails_post_data);

        assert.equal(17, emails.length);
        assert.equal("Selfie", emails[0].title);
    });

    it("Handles email_data_post consistently", () => {
        var gmail = new Gmail();
        var email = gmail.helper.get.email_data_post(testData.email_data_post_data);

        assert.equal("156559dc1867409f", email.first_email);
        assert.equal("156559dc1867409f", email.thread_id);
        assert.equal("Ny pålogging fra Chrome på Windows", email.subject);
        assert.equal(2, email.people_involved.length);
        assert.equal(1, email.total_emails);
    });
});

describe("Attachment-parsing", () => {

    var email_attachment_url_png = "";
    var email_attachment_url_pdf = "";

    it("Handles attachments URLs consistently", () => {
        var gmail = new Gmail();

        var testCases = [
            {
                value: "image/png:typescript.png:https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.1&disp=safe&zw",
                type: "image/png",
                name: "typescript.png",
                url: "https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.1&disp=safe&zw"
            },
            {
                value: "application/pdf:image2016-11-15-132610.pdf:https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.3&disp=safe&zw",
                type: "application/pdf",
                name: "image2016-11-15-132610.pdf",
                url: "https://mail.google.com/mail/u/0/?ui=2&ik=4b86ba4469&view=att&th=158de724051f63cf&attid=0.3&disp=safe&zw"
            }
        ];

        for (var i=0; i < testCases.length; i++) {
            var testCase = testCases[i];

            var result = gmail.tools.parse_attachment_url(testCase.value);
            assert.equal(result.type, testCase.type);
            assert.equal(result.name, testCase.name);
            assert.equal(result.url, testCase.url);
        }
    });

});
