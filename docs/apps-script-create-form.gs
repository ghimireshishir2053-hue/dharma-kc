/**
 * Lamjung Experts Initiative — Google Form builder
 *
 * One-shot Apps Script that creates:
 *   - A bilingual (Nepali + English) Google Form with all sections
 *   - A linked Google Sheet for responses
 *
 * How to run:
 *   1. Open https://script.google.com → New project
 *   2. Replace Code.gs contents with this file
 *   3. Save, then Run → `createLamjungExpertForm`
 *   4. First run: authorize with your Google account (Forms + Sheets scopes)
 *   5. Check View → Executions / Logs for the Edit / Live / Embed / Sheet URLs
 *   6. Paste the Embed URL into content/callForExperts.ts → formEmbedUrl
 */
function createLamjungExpertForm() {
  const form = FormApp.create('लमजुङ विकास पहल — विज्ञ तथा सरोकारवाला आवेदन');

  form.setDescription(
    'माननीय धर्मराज के.सी., सांसद (लमजुङ-१) को कार्यालयले लमजुङको दिगो विकासका लागि विभिन्न क्षेत्रका विज्ञ तथा सरोकारवालाहरूबाट आवेदन आह्वान गर्दछ।\n\n' +
    'The Office of Hon. Dharma Raj K.C., MP (Lamjung-1), invites applications from experts and stakeholders across sectors to contribute to the Lamjung Development Initiative. Shortlisted applicants will be invited to a virtual consultation, followed by a 2–3 day workshop in Besisahar.\n\n' +
    'Deadline: [Insert Date]  ·  Queries: office@dharmakc.np  ·  Est. time: 15–20 min'
  );

  form.setCollectEmail(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(true);
  form.setConfirmationMessage(
    'धन्यवाद! तपाईंको आवेदन प्राप्त भयो। छनोट समितिले २ हप्ताभित्र इमेल मार्फत सम्पर्क गर्नेछ।\n\n' +
    'Thank you. Your application has been received. The selection committee will contact you by email within 2 weeks.'
  );

  const req = (item) => { item.setRequired(true); return item; };

  // ===== 1 — Basic Information =====
  form.addSectionHeaderItem()
    .setTitle('१ · आधारभूत विवरण — Basic Information')
    .setHelpText('तपाईं को हुनुहुन्छ र हामी कसरी सम्पर्क गर्न सक्छौँ। / Tell us who you are.');

  req(form.addTextItem().setTitle('पूरा नाम — Full name'));

  req(form.addTextItem()
    .setTitle('मोबाइल नम्बर (देशको कोडसहित) — Phone (with country code)')
    .setHelpText('जस्तै +977 98xxxxxxxx'));

  req(form.addTextItem()
    .setTitle('हालको स्थान (सहर, देश) — Current location (city, country)'));

  req(form.addParagraphTextItem()
    .setTitle('स्थायी ठेगाना — Permanent address'));

  req(form.addListItem()
    .setTitle('लमजुङसँगको सम्बन्ध — Connection to Lamjung')
    .setChoiceValues([
      'लमजुङमा जन्मेको — Born in Lamjung',
      'लमजुङमा हुर्केको — Raised in Lamjung',
      'पारिवारिक जरा लमजुङमा — Family roots in Lamjung',
      'हाल लमजुङमा बस्दै — Currently living in Lamjung',
      'लमजुङसँग काम गर्दै — Working in/with Lamjung',
      'अन्य — Other',
    ]));

  form.addListItem()
    .setTitle('उमेर समूह — Age group (optional)')
    .setChoiceValues(['२५ मुनि / Under 25', '25–34', '35–44', '45–54', '55+']);

  form.addListItem()
    .setTitle('लिङ्ग — Gender (optional)')
    .setChoiceValues([
      'महिला — Woman',
      'पुरुष — Man',
      'अन्य — Non-binary',
      'भन्न चाहन्न — Prefer not to say',
    ]);

  // ===== 2 — Professional Background =====
  form.addPageBreakItem().setTitle('२ · पेशागत पृष्ठभूमि — Professional Background');

  req(form.addTextItem().setTitle('हालको पद / भूमिका — Current role / title'));
  req(form.addTextItem().setTitle('हालको संस्था — Current organization'));

  req(form.addCheckboxItem()
    .setTitle('विशेषज्ञताको क्षेत्र (लागू हुने सबै) — Sector(s) of expertise (select all that apply)')
    .setChoiceValues([
      'शिक्षा — Education',
      'स्वास्थ्य — Health',
      'पर्यटन — Tourism',
      'जलविद्युत् र ऊर्जा — Hydropower & Energy',
      'खानेपानी र सरसफाइ — Water Supply & Sanitation',
      'सडक र पूर्वाधार — Roads & Infrastructure',
      'कृषि — Agriculture',
      'वित्त र आर्थिक विकास — Finance & Economic Development',
      'अन्य — Other',
    ]));

  form.addTextItem()
    .setTitle('उप-विशेषज्ञता — Sub-specialization (optional)')
    .setHelpText('जस्तै: मातृ स्वास्थ्य, लघु-जलविद्युत्, कृषि वित्त');

  req(form.addListItem()
    .setTitle('क्षेत्रमा अनुभवका वर्ष — Years of experience in sector')
    .setChoiceValues(['३ भन्दा कम / Under 3', '3–5', '6–10', '11–15', '16+']));

  req(form.addListItem()
    .setTitle('उच्चतम शैक्षिक योग्यता — Highest qualification')
    .setChoiceValues([
      'स्नातक — Bachelor',
      'स्नातकोत्तर — Masters',
      'विद्यावारिधि — PhD',
      'व्यावसायिक प्रमाणपत्र — Professional certification',
      'अन्य — Other',
    ]));

  req(form.addParagraphTextItem()
    .setTitle('प्रमुख ३ उपलब्धि (एक हरफ प्रति) — Top 3 achievements (one per line)'));

  // ===== 3 — Expertise Validation =====
  form.addPageBreakItem().setTitle('३ · विशेषज्ञता प्रमाणीकरण — Expertise Validation');

  req(form.addParagraphTextItem()
    .setTitle('लमजुङ वा समान पहाडी जिल्लासँगको अनुभव — Your experience relevant to Lamjung or comparable hill districts')
    .setHelpText('अधिकतम २५० शब्द / Max 250 words'));

  req(form.addParagraphTextItem()
    .setTitle('१-२ परियोजना मापनयोग्य प्रभावसहित — 1–2 projects with measurable impact')
    .setHelpText('के थियो, कसलाई फाइदा, अंकमा। अधिकतम ३०० शब्द / What, who benefited, with numbers. Max 300 words.'));

  form.addTextItem()
    .setTitle('पोर्टफोलियो / LinkedIn / वेबसाइट — Portfolio / LinkedIn / website (optional)');

  form.addTextItem()
    .setTitle('CV लिङ्क (Google Drive / Dropbox) — CV link (Drive / Dropbox) (optional)')
    .setHelpText('सार्वजनिक वा view पहुँच भएको लिङ्क। / Make sure the link is publicly viewable.');

  // ===== 4 — Problem-Solving Ability =====
  form.addPageBreakItem().setTitle('४ · समस्या समाधान — Problem-Solving Ability');

  req(form.addParagraphTextItem()
    .setTitle('लमजुङमा तपाईंको क्षेत्रका प्रमुख ३ समस्या — Top 3 problems in your sector in Lamjung'));

  req(form.addParagraphTextItem()
    .setTitle('त्यस मध्ये एउटा समस्याको व्यावहारिक समाधान — Practical solution for one of those problems')
    .setHelpText('ठोस बन्नुहोस्। अधिकतम ३०० शब्द / Be concrete. Max 300 words.'));

  req(form.addParagraphTextItem()
    .setTitle('स्थानीय स्तरमा कार्यान्वयन रणनीति — Implementation approach at local level')
    .setHelpText('साझेदार, बजेट स्तर, समयरेखा। अधिकतम २०० शब्द / Partners, budget scale, timeline. Max 200 words.'));

  form.addParagraphTextItem()
    .setTitle('सफलता मापनका KPI — KPIs to measure success (optional)');

  // ===== 5 — Commitment & Availability =====
  form.addPageBreakItem().setTitle('५ · प्रतिबद्धता र उपलब्धता — Commitment & Availability');

  req(form.addMultipleChoiceItem()
    .setTitle('६०–९० मिनेटको भर्चुअल परामर्शमा सहभागी हुन इच्छुक? — Willing to join 60–90 min virtual consultation?')
    .setChoiceValues(['छु — Yes', 'छैन — No']));

  req(form.addMultipleChoiceItem()
    .setTitle('बेसीशहरमा २–३ दिने कार्यशालामा सहभागी हुन इच्छुक? — Willing to attend 2–3 day workshop in Besisahar?')
    .setChoiceValues([
      'छु — Yes',
      'सायद (मितिमा निर्भर) — Maybe (depends on dates)',
      'छैन — No',
    ]));

  req(form.addListItem()
    .setTitle('अर्को ३ महिनामा प्रति हप्ता समय — Hours/week over the next 3 months')
    .setChoiceValues([
      '१–३ घण्टा / 1–3 hrs',
      '४–७ घण्टा / 4–7 hrs',
      '८–१५ घण्टा / 8–15 hrs',
      '१६+ घण्टा / 16+ hrs',
      'परियोजना-आधारित / Project-based',
    ]));

  req(form.addMultipleChoiceItem()
    .setTitle('कार्यशालाका लागि यात्रा/बसाइ सहयोग आवश्यक? — Travel / accommodation support needed?')
    .setChoiceValues([
      'पूर्ण सहयोग चाहिन्छ — Yes (full support)',
      'आंशिक — Partial',
      'चाहिँदैन — No',
    ]));

  // ===== 6 — Optional but Valuable =====
  form.addPageBreakItem().setTitle('६ · वैकल्पिक तर मूल्यवान — Optional but Valuable');

  form.addParagraphTextItem()
    .setTitle('नीति / सरकारसँगको अघिल्लो सहकार्य अनुभव — Prior policy / government collaboration (optional)');

  form.addMultipleChoiceItem()
    .setTitle('क्षेत्रगत कार्यदलको नेतृत्व वा मार्गदर्शन गर्न इच्छुक? — Willing to mentor or lead a sector group? (optional)')
    .setChoiceValues(['इच्छुक छु — Yes', 'सायद — Maybe', 'छैन — No']);

  form.addCheckboxItem()
    .setTitle('काम गर्न सजिलो लाग्ने भाषा — Language(s) comfortable working in (optional)')
    .setChoiceValues([
      'नेपाली / Nepali',
      'अंग्रेजी / English',
      'गुरुङ / Gurung',
      'तामाङ / Tamang',
      'अन्य / Other',
    ]);

  form.addParagraphTextItem()
    .setTitle('समितिलाई थप केही भन्न चाहानुहुन्छ? — Anything else we should know? (optional)');

  // ===== 7 — Consent =====
  form.addPageBreakItem().setTitle('७ · सहमति — Consent');

  req(form.addCheckboxItem()
    .setTitle('सहमति — Consent')
    .setChoiceValues([
      'म आवेदन समीक्षाका लागि सांसद कार्यालयको छनोट समितिले सम्पर्क गर्ने र जानकारी हेर्ने कुरामा सहमत छु। / I consent to be contacted and reviewed by the MP office\'s selection committee.',
    ]));

  // ===== Linked responses Sheet =====
  const spreadsheet = SpreadsheetApp.create('लमजुङ विज्ञ आवेदन — Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  const editUrl = form.getEditUrl();
  const liveUrl = form.getPublishedUrl();
  const embedUrl = liveUrl.replace('/viewform', '/viewform?embedded=true');
  const sheetUrl = spreadsheet.getUrl();

  const out = [
    '',
    '=========================================',
    ' ✅  Form created successfully',
    '=========================================',
    '',
    '📝 EDIT URL (open to tweak the form):',
    '   ' + editUrl,
    '',
    '🔗 LIVE URL (share with applicants):',
    '   ' + liveUrl,
    '',
    '🪟 EMBED URL (paste into content/callForExperts.ts → formEmbedUrl):',
    '   ' + embedUrl,
    '',
    '📊 RESPONSES SHEET:',
    '   ' + sheetUrl,
    '',
    '=========================================',
  ].join('\n');

  Logger.log(out);
  return out;
}
