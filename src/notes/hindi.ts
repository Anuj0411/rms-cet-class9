import type { NoteBit } from "./types.ts";

export const hindiNotes: Record<string, NoteBit[]> = {
  "h-nouns": [
    {
      idea: "A संज्ञा names a person, place, thing, animal or feeling.",
      example: "राम, दिल्ली, पुस्तक, गाय, खुशी।",
    },
    {
      idea: "व्यक्तिवाचक is one special name. जातिवाचक is a whole class. भाववाचक is a quality or feeling.",
      example: "राम is व्यक्तिवाचक. लड़का is जातिवाचक. बचपन and मिठास are भाववाचक.",
    },
    {
      idea: "A सर्वनाम stands in place of a name. A विशेषण describes a संज्ञा.",
      example: "मैं, तुम, वह, यह, जो are pronouns. काला घोड़ा — काला is the adjective.",
    },
    {
      idea: "लिंग is gender. वचन is number. Masculine and feminine, and one versus many, must match the verb.",
      example: "लड़का reads. लड़के read. घोड़ा / घोड़ी. किताब / किताबें.",
    },
    {
      idea: "For respect, one person can take a plural verb.",
      example: "गुरु जी आ रहे हैं।",
    },
    {
      idea: "द्रव्यवाचक names a material. समूहवाचक names a collection. A river word can be a class, while one river’s name is a special name.",
      example: "सोना is द्रव्यवाचक. सेना is समूहवाचक. नदी is जातिवाचक. गंगा and दिल्ली are व्यक्तिवाचक. बचपन is भाववाचक.",
    },
    {
      idea: "पुरुष of a pronoun: मैं is उत्तम (the speaker), तुम is मध्यम (the listener), वह is अन्य (someone else). कौन asks a question. कोई is not a particular person.",
      example: "कवि becomes कवयित्री in the feminine.",
    },
  ],
  "h-verbs": [
    {
      idea: "The क्रिया tells the action or the state. The कर्ता is who does it. The कर्म is what receives it.",
      example: "राम आम खाता है। राम is कर्ता, आम is कर्म, खाता है is क्रिया.",
    },
    {
      idea: "A transitive verb has an object. An intransitive verb does not.",
      example: "पढ़ना can take a book, so it is सकर्मक. सोना has no object, so it is अकर्मक.",
    },
    {
      idea: "काल is tense. Present, past and future each have a simple form and a continuous form.",
      example: "वह पढ़ता है. वह पढ़ रहा है. वह पढ़ेगा.",
    },
    {
      idea: "The verb agrees with the subject. If the object is marked with ने in the past, the verb often agrees with the object instead.",
      example: "लड़के ने किताब पढ़ी। The verb पढ़ी matches किताब, which is feminine.",
    },
    {
      idea: "प्रेरणार्थक means making someone else do the action. A पूर्वकालिक form ends with कर and shows the earlier action. सकना shows ability.",
      example: "पढ़ना → पढ़ाना. वह खाना खाकर सो गया. बच्चा पढ़ सकता है.",
    },
    {
      idea: "सामान्य वर्तमान is a habit. अपूर्ण वर्तमान is going on now. पूर्ण वर्तमान is already finished. सामान्य भूत is a finished past.",
      example: "सीता प्रतिदिन पढ़ती है. मोहन पत्र लिख रहा है. हम काम कर चुके हैं. राम कल बाजार गया.",
    },
  ],
  "h-case": [
    {
      idea: "कारक shows how a noun is related to the verb. The little word after the noun is the परसर्ग, or marker.",
    },
    {
      idea: "कर्ता uses ने, but mainly in the past. कर्म uses को. करण, the means, uses से.",
      example: "राम ने कलम से पत्र लिखा। ने marks राम. से marks the pen.",
    },
    {
      idea: "सम्प्रदान, the receiver, uses को or के लिए. अपादान, separation or comparison, uses से. अधिकरण, place or time, uses में or पर.",
      example: "माँ बच्चे को फल देती है. पेड़ से पत्ता गिरा. मेज पर पुस्तक है.",
    },
    {
      idea: "सम्बन्ध uses का, के, की and matches the thing that is owned, not the owner.",
      example: "राम की पुस्तक. राम के घोड़े. The marker follows पुस्तक and घोड़े.",
    },
    {
      idea: "संबोधन is calling someone. There is often no marker, sometimes हे.",
      example: "हे बच्चों! शांत बैठो.",
    },
    {
      idea: "The same marker can change its कारक. को can be कर्म or सम्प्रदान. से can be the means, the source, or a comparison.",
      example: "छात्र को बुलाया — कर्म. पोते को मिठाई दी — सम्प्रदान. कलम से — करण. पेड़ से पत्ता गिरा — अपादान. मोहन से ऊँचा — comparison.",
    },
  ],
  "h-samas": [
    {
      idea: "A समास joins two words into one shorter word. The first part is पूर्वपद. The second is उत्तरपद.",
    },
    {
      idea: "तत्पुरुष drops a marker such as का, के, की, से or के लिए. The second word is the main one.",
      example: "राजपुत्र means राजा का पुत्र. धर्मग्रन्थ means धर्म की पुस्तक.",
    },
    {
      idea: "कर्मधारय is a special तत्पुरुष where the first part describes the second, like an adjective.",
      example: "नीलकमल means नीला कमल. महापुरुष means महान पुरुष.",
    },
    {
      idea: "द्वंद्व joins two equals with “and”. Both parts matter.",
      example: "माता-पिता, रात-दिन, सुख-दुख.",
    },
    {
      idea: "द्विगु is a group with a number. बहुव्रीहि names something else, not either of the two parts. अव्ययीभाव starts with an indeclinable word.",
      example: "चौराहा is four roads. पीताम्बर names Krishna, not the cloth. यथाशक्ति means according to one’s strength.",
    },
    {
      idea: "A उपसर्ग is fixed at the front and changes the meaning. A प्रत्यय is fixed at the end and makes a new word.",
      example: "अ + ज्ञान = अज्ञान. अनु + भव = अनुभव. अव + गुण = अवगुण. सु + गम = सुगम. दुर् + जन = दुर्जन. लिखा + आई = लिखाई. भारत + ईय = भारतीय. मित्र + ता = मित्रता.",
    },
  ],
  "h-idioms": [
    {
      idea: "A मुहावरा is a short phrase whose meaning is not the meaning of its separate words. Learn the meaning as a whole.",
    },
    {
      idea: "आँखों का तारा means someone very dear, often a child. नौ दो ग्यारह होना means to run away. ईद का चाँद होना means to be seen very rarely.",
    },
    {
      idea: "दाल में कुछ काला होना means something looks suspicious. अधजल गगरी छलकत जाए means a person with a little knowledge boasts the most. जैसे को तैसा means tit for tat.",
    },
    {
      idea: "A लोकोक्ति is a full saying, a proverb, not just a phrase.",
      example: "नाच न जाने आँगन टेढ़ा — a person who cannot do the work blames the place.",
    },
    {
      idea: "In the exam, replace the idiom with its meaning and see which option still fits the sentence.",
    },
  ],
  "h-synonyms": [
    {
      idea: "A पर्यायवाची is a word with the same meaning. One word can have several. Any correct one can be the answer.",
      example: "अग्नि: आग, पावक. जल: नीर, सलिल. सूर्य: रवि, दिनकर. चंद्रमा: शशि, राकेश. आकाश: गगन, नभ. कमल: पंकज, सरोज.",
    },
    {
      idea: "A विलोम is the opposite.",
      example: "दिन / रात. सुख / दुख. ज्ञान / अज्ञान. मान / अपमान. प्रकाश / अंधकार. जीवन / मृत्यु.",
    },
    {
      idea: "अनेकार्थी is one word with more than one meaning. Read the sentence before you choose.",
      example: "अंबर can mean sky or cloth. हल can mean a plough or a solution.",
    },
    {
      idea: "श्रुतिसम words sound alike but mean different things. Do not swap them.",
      example: "कुल is family. कूल is a shore. दिन is day. दीन is poor.",
    },
  ],
  "h-correction": [
    {
      idea: "Check gender, number and verb ending first. These cause most errors.",
      example: "लड़की जाती है, not लड़की जाता है. बच्चे खेल रहे हैं.",
    },
    {
      idea: "With ने in the past, match the verb to the object when the object has no को.",
      example: "उसने रोटी खाई. उसने आम खाया.",
    },
    {
      idea: "Use the correct matra and the correct similar letter. A wrong matra changes the word.",
      example: "किताब, not कीताब. पढ़ाई needs the right marks.",
    },
    {
      idea: "Should, can, and must have their own forms. Do not mix them with the simple tense.",
      example: "उसे जाना चाहिए. वह जा सकता है. तुम्हें पढ़ना होगा.",
    },
  ],
  "h-alankar": [
    {
      idea: "An अलंकार is a decoration of language. शब्दालंकार decorates the sound. अर्थालंकार decorates the meaning.",
    },
    {
      idea: "अनुप्रास repeats the same sound. यमक repeats a word but the meaning changes. श्लेष uses one word that carries two meanings at once.",
      example: "चन्दर कर को चकोर. In यमक, घट can mean a pot in one place and a body in another.",
    },
    {
      idea: "उपमा compares two things using जैसा, की तरह or समान. रूपक says one thing is the other, with no “like”.",
      example: "मुख चाँद के समान है — उपमा. मुख चाँद है — रूपक.",
    },
    {
      idea: "In an उपमा, the उपमेय is the thing being described, the उपमान is the thing it is compared with, and the वाचक is the comparing word.",
      example: "हाथ कमल के समान कोमल हैं. हाथ is उपमेय. कमल is उपमान. समान is वाचक.",
    },
    {
      idea: "अतिशयोक्ति exaggerates beyond what is possible. मानवीकरण treats a lifeless thing as a person.",
      example: "हाथों के छालों ने नियति बदल दी is exaggeration. फूल मुस्कुराए is personification.",
    },
  ],
};
