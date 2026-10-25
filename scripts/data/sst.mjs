import { fromRows } from "./mcq.mjs";

const memoryTricks = {
  "What makes a thing a resource?": [
    "चीज़ संसाधन तब बनती है जब वह काम आए। कीमत का टैग अकेला काफी नहीं।",
    "Only a high market price, even if nobody can use it महँगा पर बेकार सामान संसाधन नहीं।"
  ],
  "A free and beautiful waterfall can still be a resource because": [
    "मुफ्त झरना भी संसाधन है, क्योंकि लोग उसका उपयोग कर सकते हैं। पेटेंट उसका नाम नहीं।",
    "only goods with a printed price are resources कीमत छपी हो, तभी संसाधन, यह नियम गलत है।"
  ],
  "A patent gives a person": [
    "पेटेंट आविष्कार पर अकेला हक है। बारिश या नदी का नाम बदलना पेटेंट नहीं।",
    "the ownership of all rainfall in a state बारिश किसी एक आदमी की संपत्ति नहीं बनती।"
  ],
  "Which of these is a natural resource?": [
    "हवा प्राकृतिक संसाधन है। पुल, लैपटॉप और सड़क इंसान के बनाए हैं।",
    "A concrete bridge कंक्रीट का पुल इंसान का बनाया संसाधन है।"
  ],
  "Which of these is a human-made resource?": [
    "रेल का पुल इंसान का बनाया संसाधन है। धूप, हवा और ज़मीन में पड़ा लोहा कुदरती हैं।",
    "Sunlight धूप कुदरत की है, पुल नहीं।"
  ],
  "Which of these is a human resource?": [
    "शिक्षक का ज्ञान और हुनर मानव संसाधन है। कोयला और नदी कुदरती हैं।",
    "A seam of coal कोयले की परत खनिज है, आदमी का हुनर नहीं।"
  ],
  "Which energy source is renewable?": [
    "हवा फिर बनती रहती है, इसलिए नवीकरणीय है। कोयला और पेट्रोलियम खत्म होने वाले हैं।",
    "Coal कोयला एक बार जलकर वापस जल्दी नहीं बनता।"
  ],
  "Which statement about water is correct?": [
    "पानी नवीकरणीय है, फिर भी बर्बादी और गंदगी से कम पड़ सकता है।",
    "Water is non-renewable in the same way as coal पानी को कोयले की तरह समाप्त संसाधन मत कहो।"
  ],
  "Which example shows technology turning nature into a usable resource?": [
    "नदी के बहाव से बिजली बनाना तकनीक का जादू है: कुदरत उपयोगी संसाधन बन गई।",
    "Giving a mountain a new name and doing nothing else नाम बदलने से संसाधन नहीं बनता।"
  ],
  "People are called a special resource because": [
    "इंसान खास संसाधन है क्योंकि वह उपयोग खोजता है और चीज़ों को संसाधन बनाता है।",
    "they are a kind of coal इंसान कोयले की खदान नहीं है।"
  ],
  "Sustainable development means": [
    "सतत विकास: आज की ज़रूरत पूरी करो, कल की पीढ़ी का हिस्सा मत मिटाओ।",
    "using up every mineral as fast as possible जल्दी लूट लेना सतत विकास नहीं।"
  ],
  "Why is careful use of minerals important?": [
    "खनिजों का भंडार सीमित है और वे नवीकरणीय नहीं। हर मानसून में नहीं उगते।",
    "Minerals grow back after every monsoon खनिज बारिश के बाद फसल की तरह नहीं उगते।"
  ],
  "Which action conserves a non-renewable metal?": [
    "एल्युमिनियम फिर इस्तेमाल करना अनवीकरणीय धातु बचाता है। नदी में फेंकना बर्बादी है।",
    "Dumping metal scrap in a river कबाड़ नदी में फेंकना संरक्षण नहीं।"
  ],
  "What improves the quality of a country's human resources?": [
    "पढ़ाई और स्वास्थ्य सेवा मानव संसाधन को बेहतर बनाती हैं। स्कूल बंद करना उल्टा है।",
    "Closing schools स्कूल बंद करना हुनर बढ़ाता नहीं।"
  ],
  "Petroleum is non-renewable because": [
    "पेट्रोलियम लाखों साल में बनता है और भंडार सीमित है, इसलिए अनवीकरणीय है।",
    "new petroleum is produced in every rainy season हर बरसात नई तेल की फसल नहीं होती।"
  ],
  "Which of these is renewable?": [
    "सूरज नवीकरणीय है। कोयला, पेट्रोलियम और प्राकृतिक गैस नहीं।",
    "Coal कोयला सूरज की तरह रोज़ नया नहीं बनता।"
  ],
  "Which group contains only human-made resources?": [
    "पुल, मशीन और सड़क सिर्फ मानव-निर्मित हैं। हवा, कोयला और मिट्टी कुदरती हैं।",
    "Air, coal, and soil ये तीनों कुदरत के हैं, कारखाने के नहीं।"
  ],
  "Which practice matches sustainable development?": [
    "काटने के बाद पेड़ लगाना और भूजल सँभालना सतत विकास है। कुआँ सुखा देना नहीं।",
    "Clearing a forest and never replanting it जंगल काटकर भूल जाना सतत नहीं।"
  ],
  "Which statement about the spread of resources is correct?": [
    "संसाधन धरती पर असमान बँटे हैं। हर ज़िले में एक जैसे खनिज नहीं।",
    "Every district has the same minerals हर ज़िला एक जैसी खदान नहीं।"
  ],
  "A substance in nature becomes a resource when": [
    "कुदरत की चीज़ संसाधन तब बनती है जब लोग उसका उपयोग पा लें।",
    "it has no utility बिना उपयोग के वह संसाधन नहीं कहलाती।"
  ],
  "Which description of forests is accurate?": [
    "जंगल फिर उग सकते हैं, पर बहुत काटने से मिट भी सकते हैं। रात भर में औज़ार नहीं बनते।",
    "They are impossible to harm जंगल को नुकसान नहीं हो सकता, यह गलत है।"
  ],
  "Which is a human resource rather than a human-made object?": [
    "जुलाहे का हुनर मानव संसाधन है। करघा, कपड़ा और इमारत मानव-निर्मित चीज़ें हैं।",
    "The loom in the workshop करघा वस्तु है, आदमी का हुनर नहीं।"
  ],
  "Which pair helps to explain how resources become available?": [
    "समय और तकनीक बताते हैं कि संसाधन कैसे उपलब्ध होता है। किस्मत अकेले काफी नहीं।",
    "Colour and luck alone रंग और किस्मत संसाधन का नियम नहीं।"
  ],
  "Which person is using a resource sustainably?": [
    "जो किसान बीज बचाए, मिट्टी रखे और पानी कम बहाए, वह संसाधन सतत इस्तेमाल कर रहा है।",
    "A miner who extracts ore with no plan to reuse or restore anything बिना योजना खुदाई सतत नहीं।"
  ],
  "About how much of the earth's surface is land?": [
    "धरती की सतह का लगभग 30 प्रतिशत थल है। 70 प्रतिशत पानी है, ज़मीन नहीं।",
    "About 70 per cent सत्तर पानी का हिस्सा है, थल का नहीं।"
  ],
  "Why are many river plains densely populated?": [
    "नदी के मैदानों में मिट्टी और पानी खेती और बसावट के लिए अच्छे हैं, इसलिए भीड़ है।",
    "Farming is impossible on flat land समतल ज़मीन पर खेती नामुमकिन नहीं होती।"
  ],
  "Which is a factor in the formation of soil?": [
    "मिट्टी जनक चट्टान से धीरे बनती है। गेहूँ की कीमत मिट्टी नहीं बनाती।",
    "The market price of wheat बाज़ार भाव मिट्टी का माता-पिता नहीं।"
  ],
  "Which of these also affects soil formation?": [
    "जलवायु भी मिट्टी बनाने में हाथ बँटाती है। झंडे का रंग नहीं।",
    "The colour of a national flag झंडा मिट्टी की फैक्टरी नहीं।"
  ],
  "Why does bare rock not become deep soil overnight?": [
    "नंगी चट्टान रात भर में गहरी मिट्टी नहीं बनती। मिट्टी को लम्बा समय लगता है।",
    "One shower completes the whole process एक बौछार पूरी मिट्टी नहीं बना देती।"
  ],
  "Humus is": [
    "ह्यूमस सड़े पौधे और जानवर हैं, जो ऊपरी मिट्टी को उपजाऊ बनाते हैं।",
    "fresh sand with no organic matter खाली रेत में यह सड़ा खाद नहीं होता।"
  ],
  "Which action can degrade land?": [
    "जंगल काटकर ढलान नंगा छोड़ना भूमि बिगाड़ता है। मल्चिंग और समोच्च जुताई बचाती हैं।",
    "Mulching a field पुआल से ढकना नुकसान नहीं, बचाव है।"
  ],
  "Overgrazing harms land because": [
    "अत्यधिक चराई पौधे उखाड़ देती है जो मिट्टी पकड़े रहते हैं। जानवर सीढ़ियाँ नहीं बनाते।",
    "animals always build terraces जानवर अपने आप सीढ़ीदार खेत नहीं बनाते।"
  ],
  "Mulching means": [
    "मल्चिंग: नंगी ज़मीन को पुआल जैसे पदार्थ से ढकना, ताकि नमी बनी रहे।",
    "cutting flat steps into a steep hill सीढ़ियाँ बनाना वेदिका खेती है, मल्चिंग नहीं।"
  ],
  "Terrace farming is used to": [
    "वेदिका खेती ढलान पर सपाट सीढ़ियाँ बनाती है, ताकि पानी सीधा न बहे।",
    "cover the soil with a layer of straw पुआल ओढ़ाना मल्चिंग है, वेदिका नहीं।"
  ],
  "A shelter belt is": [
    "रक्षक मेखला पेड़ों की पंक्ति है जो हवा रोककर मिट्टी बचाती है। कमर का पट्टा नहीं।",
    "a belt worn while ploughing कमर का बेल्ट खेत की हवा नहीं रोकता।"
  ],
  "Contour ploughing means": [
    "समोच्च जुताई पहाड़ी की समतल रेखाओं के साथ होती है, पानी धीमा पड़ता है।",
    "ploughing straight up and down the steepest slope खड़ी ढलान पर ऊपर-नीचे जोतना मिट्टी बहा ले जाता है।"
  ],
  "Most of the water on earth is": [
    "धरती का ज़्यादातर पानी नमकीन समुद्री है, जैसे का तैसा पी नहीं सकते।",
    "fresh water stored in village wells गाँव के कुएँ पृथ्वी का ज़्यादातर पानी नहीं हैं।"
  ],
  "Which combination can cause water scarcity?": [
    "बढ़ती माँग, बर्बादी और प्रदूषण मिलकर पानी की कमी ला सकते हैं।",
    "Harvesting roof rain and using it wisely छत का पानी सँभालना कमी बढ़ाता नहीं।"
  ],
  "Rainwater harvesting means": [
    "वर्षाजल संग्रहण बारिश को इकट्ठा करके बाद के लिए रखना है। समुद्र में बहाना नहीं।",
    "sending every drop straight to the sea हर बूँद समुद्र में उड़ेलना संग्रहण नहीं।"
  ],
  "Natural vegetation in a place depends mainly on": [
    "प्राकृतिक वनस्पति मुख्यतः ताप और वर्षा पर टिकी है। भाषा या त्योहार पर नहीं।",
    "the official language राजभाषा जंगल का मौसम नहीं बदलती।"
  ],
  "A wildlife sanctuary is meant to": [
    "वन्यजीव अभयारण्य जंगली जानवरों और उनके घर को बचाता है। शहर या खदान के लिए नहीं।",
    "allow free trade in rare animals दुर्लभ जानवरों का खुला व्यापार अभयारण्य नहीं।"
  ],
  "CITES is important because it": [
    "CITES संकटग्रस्त जंगली पौधों और जानवरों के अंतर्राष्ट्रीय व्यापार को रोकता है।",
    "is a method of contour ploughing यह संधि जुताई का तरीका नहीं।"
  ],
  "Careless use of chemical fertilisers can": [
    "रासायनिक उर्वरक लापरवाही से डालो तो समय के साथ मिट्टी को नुकसान हो सकता है।",
    "turn a desert into a glacier in one night एक रात में रेगिस्तान ग्लेशियर नहीं बनता।"
  ],
  "Which list is made up of land uses?": [
    "भूमि उपयोग: खेत, जंगल, चरागाह और बस्तियाँ। पेटेंट और अक्षांश नहीं।",
    "Patents, poems, and prices कीमत और कविता ज़मीन के उपयोग नहीं।"
  ],
  "Soil erosion means": [
    "मृदा अपरदन: हवा या बहता पानी ऊपरी मिट्टी उठा ले जाए। ह्यूमस जोड़ना अपरदन नहीं।",
    "the adding of humus to a field खाद मिलाना मिट्टी का बहना नहीं।"
  ],
  "Community land is best described as": [
    "सामुदायिक भूमि गाँव के साझे काम की ज़मीन है, एक आदमी की हथियाई हुई नहीं।",
    "the private courtyard of one factory owner only एक मालिक का आँगन सामुदायिक भूमि नहीं।"
  ],
  "Drip irrigation saves water because": [
    "ड्रिप सिंचाई जड़ों के पास धीरे पानी छोड़ती है, पूरा खेत नहीं डुबोती।",
    "it floods the field every hour हर घंटे बाढ़ लाना बचत नहीं।"
  ],
  "Intercropping helps the soil because": [
    "अंतःफसल में अलग-अलग फसलें कतारों में मिट्टी को बेहतर ढकती हैं।",
    "the land is left completely bare between the rows बीच की नंगी ज़मीन इस मदद का उल्टा है।"
  ],
  "Subsistence farming mainly aims to": [
    "निर्वाह कृषि किसान के अपने परिवार का पेट भरती है। बाज़ार की बड़ी बिक्री नहीं।",
    "sell the entire harvest in a distant market पूरी फसल दूर बेचना वाणिज्यिक खेती है।"
  ],
  "Intensive subsistence farming usually has": [
    "गहन निर्वाह: छोटा खेत, बहुत मेहनत, अक्सर साल में एक से ज़्यादा फसल।",
    "a huge farm run by a few workers and large machines बड़ी मशीन वाली खेती यह नहीं।"
  ],
  "In north-east India, shifting cultivation is called": [
    "उत्तर-पूर्व भारत में स्थानांतरण खेती को झूम कहते हैं। मिल्पा और लादांग और देशों के नाम हैं।",
    "milpa मिल्पा भारत के उत्तर-पूर्व का स्थानीय नाम नहीं।"
  ],
  "Commercial farming means that crops are grown mainly": [
    "वाणिज्यिक खेती मुख्यतः बाज़ार में बेचने के लिए होती है। परिवार का पेट भरना निर्वाह है।",
    "only to be eaten by the farmer's family यह निर्वाह खेती का लक्ष्य है।"
  ],
  "A plantation is best described as": [
    "बागान बड़ा खेत है, एक मुख्य फसल, बहुत श्रम और पूँजी। चाय, कॉफी, रबर जैसे।",
    "a tiny family plot of many mixed vegetables for home use छोटा घर का खेत बागान नहीं।"
  ],
  "Rice grows best where there is": [
    "चावल को ऊँचा ताप, ज़्यादा नमी और खूब वर्षा चाहिए। ठंडी कम वर्षा गेहूँ की है।",
    "a cool winter and only moderate rain ठंडी सर्दी गेहूँ के ज़्यादा करीब है।"
  ],
  "Which conditions suit wheat?": [
    "गेहूँ को ठंडा बढ़ता मौसम, मध्यम वर्षा और कटाई पर चमकती धूप चाहिए।",
    "Standing water and very heavy equatorial rain all year खड़ा पानी चावल का शौक है।"
  ],
  "Jowar, bajra, and ragi are": [
    "ज्वार, बाजरा और रागी मोटे अनाज हैं। कम वर्षा और कम उपजाऊ मिट्टी में उग जाते हैं।",
    "plantation beverages चाय-कॉफी पेय बागान हैं, मोटे अनाज नहीं।"
  ],
  "Jute is called the golden fibre because": [
    "जूट को सुनहरा रेशा कहते हैं। वह पहाड़ी सोना या गेहूँ की किस्म नहीं।",
    "it is a precious metal mined from hills जूट खदान का सोना नहीं, रेशा है।"
  ],
  "Which pair of countries are major jute producers?": [
    "जूट के बड़े उत्पादक भारत और बांग्लादेश हैं। नॉर्वे और आइसलैंड नहीं।",
    "Norway and Iceland बर्फीले देश जूट के मुख्य उत्पादक नहीं।"
  ],
  "Cotton needs": [
    "कपास को ऊँचा ताप, हल्की वर्षा या सिंचाई, और लम्बा पाला-रहित समय चाहिए।",
    "heavy rain and flooded fields like rice खड़े पानी वाले खेत चावल के हैं।"
  ],
  "Which statement about coffee is reliable?": [
    "ब्राज़ील बड़ा कॉफी उत्पादक है। कॉफी गर्म, नम, अच्छे निकास वाली ढलान चाहती है।",
    "Coffee needs standing water like paddy कॉफी धान की तरह पानी में खड़ी नहीं होती।"
  ],
  "Tea is grown successfully where there are": [
    "चाय अच्छे निकास वाली मिट्टी और बार-बार बौछार चाहती है, भारत और केन्या की पहाड़ियों पर।",
    "flooded mangrove swamps as the ideal site डूबा मैंग्रोव चाय का आदर्श खेत नहीं।"
  ],
  "Maize grows well with": [
    "मक्का मध्यम ताप, मध्यम वर्षा और खूब धूप में अच्छी उगती है। अँधेरा और पाला नहीं।",
    "continuous frost लगातार पाला मक्का का मौसम नहीं।"
  ],
  "Nomadic herding means that people": [
    "चलवासी पशुचारण: लोग जानवरों के साथ चारा और पानी ढूँढते फिरते हैं।",
    "stay on one plantation of tea for generations without animals बिना जानवर एक चाय बागान यह नहीं।"
  ],
  "Rice is a staple food especially in": [
    "चावल खासकर एशिया के गर्म, नम मानसूनी इलाकों का मुख्य भोजन है।",
    "the frozen interior of Greenland ग्रीनलैंड की बर्फ चावल का कटोरा नहीं।"
  ],
  "In India, wheat is mainly a": [
    "भारत में गेहूँ मुख्यतः रबी, यानी सर्दी की फसल है। खड़े मानसून पानी वाली नहीं।",
    "crop that must stand in deep water through the hottest monsoon गहरा पानी चावल माँगता है।"
  ],
  "Which crop is typically grown as a plantation crop?": [
    "चाय आम बागान फसल है। बाजरा, ज्वार और रागी मोटे अनाज हैं।",
    "Bajra बाजरा बागान की चाय नहीं, मोटा अनाज है।"
  ],
  "Shifting cultivation becomes more harmful when": [
    "झूम तब ज़्यादा नुकसान करती है जब परती समय इतना छोटा हो कि जंगल संभल न पाए।",
    "the same plot is left unused for a very long recovery लम्बा आराम जंगल को संभलने देता है।"
  ],
  "Commercial grain farming is associated with": [
    "वाणिज्यिक अनाज खेती: बड़े खेत, मशीनें, शीतोष्ण घास के मैदानों में गेहूँ जैसी फसल।",
    "a one-hectare family plot worked only with hand tools for home rice छोटा घर का चावल यह नहीं।"
  ],
  "Jute grows especially well in": [
    "जूट गंगा-ब्रह्मपुत्र डेल्टा की जलोढ़ ज़मीन में खास अच्छा उगता है।",
    "the snowfields of the high Himalaya ऊँची बर्फ जूट का खेत नहीं।"
  ],
  "Which of these is a fibre crop?": [
    "जूट रेशा फसल है। चावल, गेहूँ और मक्का अनाज हैं।",
    "Rice चावल रेशा नहीं, अनाज है।"
  ],
  "Tea plantations need a large number of workers mainly because": [
    "चाय के कोमल पत्ते हाथ से तोड़े जाते हैं, इसलिए बागान में बहुत मज़दूर लगते हैं।",
    "the bushes are harvested by one person with a single machine in an hour एक घंटे में एक मशीन पूरा बागान नहीं तोड़ती।"
  ],
  "Primitive subsistence farming includes": [
    "आदिकालीन निर्वाह में झूम और चलवासी पशुचारण आते हैं। प्रेयरी के बड़े गेहूँ खेत नहीं।",
    "only large wheat estates in the prairies प्रेयरी के बड़े खेत वाणिज्यिक अनाज खेती हैं।"
  ],
  "Manufacturing is called a secondary activity because it": [
    "निर्माण कच्चे माल को तैयार माल बनाता है, इसलिए यह द्वितीयक क्रिया है। जंगली फल चुनना प्राथमिक है।",
    "only picks wild fruit and sells it unchanged बिना बदलाव फल बेचना निर्माण नहीं।"
  ],
  "Which of these is an agro-based industry?": [
    "कपास की मिल कच्चे कपास से कपड़ा बनाती है, इसलिए कृषि-आधारित है। इस्पात अयस्क गलाता है।",
    "A steel plant that smelts iron ore लोहा गलाना खनिज-आधारित है, खेत का नहीं।"
  ],
  "Which of these is a mineral-based industry?": [
    "लोहा और इस्पात संयंत्र खनिज-आधारित है। दूध और लकड़ी के कारखाने नहीं।",
    "A dairy that packs milk from farms डेयरी खेत के दूध पर टिकी है।"
  ],
  "A marine-based industry gets its raw material mainly from": [
    "समुद्र-आधारित उद्योग कच्चा माल समुद्र से लेता है, जैसे मछली से तेल। कपास के खेत से नहीं।",
    "a cotton field कपास का खेत कृषि-आधारित है, समुद्र नहीं।"
  ],
  "Which of these is a forest-based industry?": [
    "लकड़ी की लुगदी वाला कागज़ कारखाना वन-आधारित है। मछली संयंत्र समुद्र का है।",
    "A fish-processing plant मछली समुद्र की है, जंगल की नहीं।"
  ],
  "A cottage or small-scale industry usually": [
    "कुटीर उद्योग कम पूँजी और सरल औज़ारों से अक्सर घर पर चलता है। विशाल भट्ठी नहीं।",
    "runs giant furnaces and employs a huge workforce विशाल भट्ठी बड़े पैमाने का चित्र है।"
  ],
  "A large-scale industry is best described as one that": [
    "बड़े पैमाने का उद्योग बहुत पूँजी, भारी मशीनें और बड़ा कार्यबल लगाता है।",
    "is a single potter working alone at home अकेला कुम्हार कुटीर का चित्र है।"
  ],
  "Amul, the milk union at Anand, is an example of": [
    "आणंद की अमूल दूध सहकारी है, जिसके मालिक दूध देने वाले उत्पादक खुद हैं।",
    "a public-sector steel plant owned only by the Union government सरकारी इस्पात संयंत्र सहकारी दूध संघ नहीं।"
  ],
  "A public-sector industry is owned by": [
    "सार्वजनिक क्षेत्र का उद्योग सरकार की मिल्कियत है। सिर्फ एक निजी परिवार का नहीं।",
    "only a private family, with no government share बिना सरकार का निजी परिवार सार्वजनिक क्षेत्र नहीं।"
  ],
  "A joint-sector industry is owned by": [
    "संयुक्त क्षेत्र में सरकार और निजी साझेदार साथ मालिक होते हैं।",
    "no one, because joint ownership means there is no owner संयुक्त का मतलब मालिक गायब नहीं।"
  ],
  "The Tata Iron and Steel Company, set up by a private business house, is": [
    "टाटा लौह-इस्पात निजी व्यापार घराने की है, इसलिए निजी क्षेत्र। दूध सहकार नहीं।",
    "a cooperative of milk producers दूध उत्पादकों की सहकारी टाटा इस्पात नहीं।"
  ],
  "Which set most affects the place chosen for a factory?": [
    "कारखाने की जगह कच्चा माल, भूमि, पानी, श्रम, शक्ति, पूँजी, परिवहन और बाज़ार देखते हैं।",
    "Only the colour of the factory gate फाटक का रंग जगह नहीं चुनता।"
  ],
  "TISCO was set up at Jamshedpur in": [
    "टिस्को जमशेदपुर में 1907 में बनी। 1757 प्लासी है, 1857 विद्रोह, 1947 आज़ादी।",
    "1757 1757 प्लासी का साल है, जमशेदपुर के कारखाने का नहीं।"
  ],
  "The main mineral inputs of an iron and steel plant are": [
    "इस्पात की भट्ठी के तीन खनिज मेहमान: लौह अयस्क, कोयला और चूना पत्थर।",
    "raw cotton, silk, and jute कपास, रेशम और जूट कपड़े के हैं, भट्ठी के नहीं।"
  ],
  "Jamshedpur suited a steel plant mainly because": [
    "जमशेदपुर के पास लौह अयस्क, कोयला, दूसरे खनिज, पानी और रेल थी।",
    "it lay in a cold desert with no minerals and no river बिना खनिज ठंडा रेगिस्तान यह जगह नहीं।"
  ],
  "Pittsburgh is known in this chapter as": [
    "पिट्सबर्ग इस अध्याय में अमेरिका का बड़ा इस्पात केंद्र है। जमशेदपुर का पुराना नाम नहीं।",
    "the earlier name of Jamshedpur जमशेदपुर की पुरानी साकची है, पिट्सबर्ग नहीं।"
  ],
  "Ahmedabad became a major centre of": [
    "अहमदाबाद सूती वस्त्र उद्योग का बड़ा केंद्र बना। 1600 की सूचना तकनीक नहीं।",
    "information technology in the year 1600 1600 में अहमदाबाद आईटी शहर नहीं था।"
  ],
  "Osaka came to be called the Manchester of Japan because of its": [
    "ओसाका को जापान का मैनचेस्टर सूती वस्त्र उद्योग की वजह से कहते हैं।",
    "gold mines in the Thar Desert थार की सोने की खदानें ओसाका नहीं।"
  ],
  "Bengaluru is a leading Indian centre of": [
    "बेंगलुरु भारत का बड़ा सूचना तकनीक केंद्र है। 1907 का टाटा इस्पात जमशेदपुर का है।",
    "the Tata steel plant started in 1907 टाटा इस्पात 1907 में जमशेदपुर में शुरू हुआ।"
  ],
  "Silicon Valley, a famous information-technology region, is in": [
    "सिलिकॉन वैली अमेरिका के कैलिफोर्निया में है। थार या अंटार्कटिका में नहीं।",
    "the Thar Desert थार रेगिस्तान सिलिकॉन वैली नहीं।"
  ],
  "The Bhopal gas tragedy of 1984 involved a leak of": [
    "भोपाल 1984 में कीटनाशक कारखाने से मिथाइल आइसोसाइनेट गैस रिस गई।",
    "steam from a household kettle घर की केतली की भाप यह त्रासदी नहीं।"
  ],
  "Careless industry can pollute": [
    "लापरवाह उद्योग आसपास की ज़मीन, हवा और पानी को गंदा कर सकता है।",
    "nothing at all, because smoke and waste disappear harmlessly धुआँ और कचरा अपने आप गायब नहीं होते।"
  ],
  "Iron and steel is called a feeder industry because": [
    "लोहा-इस्पात पोषक उद्योग है क्योंकि उसकी चीज़ें कई और उद्योगों का कच्चा माल बनती हैं।",
    "it feeds cattle inside the blast furnace भट्ठी में गाय नहीं पाली जाती।"
  ],
  "The Chotanagpur plateau became an important industrial region largely because": [
    "छोटानागपुर पठार कोयला और लौह अयस्क जैसे खनिजों से समृद्ध है, इसलिए उद्योग बढ़ा।",
    "it is a polar ice cap छोटानागपुर ध्रुवीय बर्फ की टोपी नहीं।"
  ],
  "People are called a resource when": [
    "लोग संसाधन तब हैं जब स्वास्थ्य, शिक्षा और हुनर देश को बाकी संसाधन इस्तेमाल करने दें।",
    "they are treated as a kind of coal इंसान कोयले की खदान नहीं होता।"
  ],
  "The world's population is distributed": [
    "दुनिया की जनसंख्या असमान बँटी है: कहीं भीड़, कहीं लगभग सूना।",
    "so that every square kilometre has the same number of people हर वर्ग किलोमीटर पर बराबर लोग नहीं।"
  ],
  "Population density means": [
    "जनसंख्या घनत्व प्रति वर्ग किलोमीटर लोगों की संख्या है। नदियाँ प्रति व्यक्ति नहीं।",
    "the number of rivers per person नदियाँ गिनना घनत्व नहीं।"
  ],
  "Which of these regions is densely populated?": [
    "दक्षिण और दक्षिण-पूर्व एशिया घने बसे हैं। ध्रुव, सहारा और ऊँची हिमालय चोटियाँ नहीं।",
    "The Sahara Desert सहारा रेगिस्तान घना बसा नहीं।"
  ],
  "Which of these is also among the crowded parts of the world?": [
    "यूरोप और उत्तर-पूर्वी उत्तरी अमेरिका भी भीड़ वाले हिस्से हैं। अमेज़न का घना जंगल नहीं।",
    "The equatorial forests of the Amazon अमेज़न का भूमध्यरेखीय जंगल भीड़ वाला शहर-पट्टा नहीं।"
  ],
  "High latitudes have few people mainly because": [
    "ऊँचे अक्षांशों में साल का बड़ा हिस्सा बहुत ठंड होती है, इसलिए लोग कम हैं।",
    "they contain the world's best rice plains ध्रुवों के पास दुनिया के सबसे अच्छे धान के मैदान नहीं।"
  ],
  "Tropical deserts are sparsely populated mainly because": [
    "उष्ण कटिबंधीय रेगिस्तान में पानी कम और गर्मी चरम होती है, इसलिए बसावट विरल है।",
    "heavy rain falls there in every month हर महीने भारी वर्षा रेगिस्तान की पहचान नहीं।"
  ],
  "High mountains are thinly populated because": [
    "ऊँचे पहाड़ों पर ढलान तीखी, मिट्टी अक्सर पतली और जलवायु कठोर होती है।",
    "every peak is a flat, easy plain हर चोटी आसान समतल मैदान नहीं होती।"
  ],
  "Equatorial forests have few large settlements because": [
    "घना जंगल और बहुत गर्म, नम जलवायु बड़ी बसावट को मुश्किल बनाते हैं।",
    "they are cold deserts of ice भूमध्यरेखीय जंगल बर्फ के ठंडे रेगिस्तान नहीं।"
  ],
  "People usually prefer plains to high mountains because": [
    "मैदान पर खेती, निर्माण और आना-जाना आसान होता है, इसलिए लोग पहाड़ से मैदान चुनते हैं।",
    "farming is impossible on flat land समतल ज़मीन पर खेती नामुमकिन नहीं।"
  ],
  "Climate affects where people live because": [
    "ज़्यादातर लोग बहुत गर्म या बहुत ठंडी जगहों से बचते हैं। जलवायु बसावट बदलती है।",
    "a harsh climate always raises the density of population कठोर जलवायु घनत्व हमेशा नहीं बढ़ाती।"
  ],
  "Fertile soil attracts people because": [
    "उपजाऊ मिट्टी खेती और पक्की भोजन आपूर्ति सहती है, इसलिए लोग आते हैं।",
    "it stops every crop from growing उपजाऊ मिट्टी हर फसल नहीं रोकती।"
  ],
  "Fresh water draws settlement because": [
    "मीठा पानी पीने, खेती और रोज़मर्रा के लिए चाहिए, इसलिए बसावट खिंचती है।",
    "deserts are crowded because they lack water पानी की कमी रेगिस्तान को भीड़ नहीं बनाती।"
  ],
  "Mineral wealth can increase population because": [
    "खदानें और तेल क्षेत्र काम बनाते हैं और मज़दूरों को खींचते हैं।",
    "minerals force every person to leave खनिज हर आदमी को भगाते नहीं।"
  ],
  "Which of these is a social or historical reason for people to stay in a place?": [
    "लंबे समय से संस्कृति, धर्म या बसी ज़िंदगी का केंद्र होना लोगों को वहीं रोके रखता है।",
    "No one has ever lived there जहाँ कभी कोई न रहा, वह ऐतिहासिक वजह नहीं।"
  ],
  "An economic reason for a dense population is that": [
    "उद्योग और दूसरे काम लोगों को शहरों की तरफ खींचते हैं। काम का न होना वजह नहीं।",
    "there is a total absence of work काम का पूरा अभाव भीड़ नहीं लाता।"
  ],
  "The number of people in a region changes through": [
    "इलाके की जनसंख्या जन्म, मृत्यु और प्रवास से बदलती है। झंडे का रंग नहीं।",
    "the colour of the national flag झंडा लोगों की गिनती नहीं बदलता।"
  ],
  "The birth rate is": [
    "जन्म दर: एक साल में प्रति 1,000 लोगों पर जीवित जन्म। मृत्यु दर इसका उल्टा जुड़वाँ है।",
    "the number of deaths per 1,000 people in a year यह मृत्यु दर है, जन्म दर नहीं।"
  ],
  "The death rate is": [
    "मृत्यु दर: एक साल में प्रति 1,000 लोगों पर मौतें। जन्म दर जीवित बच्चों की है।",
    "the number of live births per 1,000 people in a year यह जन्म दर है, मृत्यु दर नहीं।"
  ],
  "The natural growth rate of population is": [
    "प्राकृतिक वृद्धि दर जन्म दर घटा मृत्यु दर है। नदियों में कारखाने जोड़ना नहीं।",
    "only the number of people who migrate सिर्फ प्रवास प्राकृतिक वृद्धि नहीं।"
  ],
  "Migration means": [
    "प्रवास लोगों का किसी जगह आना या जाना है। अस्पताल में जन्म प्रवास नहीं।",
    "the birth of a child in a hospital अस्पताल का जन्म प्रवास नहीं कहलाता।"
  ],
  "A population pyramid with a broad base shows": [
    "चौड़ा आधार युवाओं की बड़ी संख्या दिखाता है। नब्बे साल के बुज़ुर्गों की भीड़ नहीं।",
    "that almost everyone is over the age of ninety लगभग सब नब्बे पार हों तो आधार चौड़ा नहीं होता।"
  ],
  "A narrow top on a population pyramid shows": [
    "पतला शीर्ष सबसे बड़ी उम्र के लोगों की कम संख्या दिखाता है।",
    "more babies than any other age group ज़्यादा बच्चे आधार को चौड़ा करते हैं, शीर्ष को नहीं।"
  ],
  "India's population pyramid has a broad base. This means that": [
    "भारत के पिरामिड का चौड़ा आधार मतलब युवा आबादी बड़ी है। बच्चे गायब नहीं।",
    "India has almost no children लगभग कोई बच्चा नहीं, यह चौड़े आधार का उल्टा है।"
  ],
  "One reason a country needs a constitution is that people must be able to": [
    "देश को संविधान इसलिए चाहिए ताकि लोग नियमों के एक साझे सेट पर भरोसा कर सकें।",
    "live with no rules of any kind बिना किसी नियम के रहना संविधान की वजह नहीं।"
  ],
  "A constitution helps people coordinate because it": [
    "संविधान बताता है कि देश की संस्थाएँ साथ कैसे काम करेंगी। सहयोग मना नहीं करता।",
    "forbids all cooperation सारा सहयोग मना करना समन्वय नहीं।"
  ],
  "The constitution states who has power so that": [
    "संविधान बताता है कौन सी संस्था कौन सा फैसला ले सकती है, ताकि नागरिक जानें।",
    "nobody is allowed to know who governs शासन छिपा रखना इसका उद्देश्य नहीं।"
  ],
  "Limits on power are written into a constitution so that": [
    "सत्ता की सीमाएँ इसलिए लिखी जाती हैं कि शासक मनमानी न कर सकें।",
    "a ruler may do anything without a check बिना रोक के सब कुछ करना सीमा नहीं।"
  ],
  "The aspirations in a constitution are": [
    "आकांक्षाएँ वे लक्ष्य हैं जो समाज अपने लिए रखता है, जैसे न्याय और समानता।",
    "a list of prices in a shop दुकान की कीमत सूची संविधान की आकांक्षा नहीं।"
  ],
  "After a people's movement, Nepal": [
    "जन आंदोलन के बाद नेपाल ने लोकतांत्रिक सरकार गढ़ने के लिए संविधान अपनाया।",
    "became a trading post of the East India Company in 1600 1600 की कंपनी की कोठी नेपाल का संविधान नहीं।"
  ],
  "Federalism in the Indian Constitution means that": [
    "भारतीय संघवाद में सत्ता सरकार के एक से ज़्यादा स्तरों में बँटी है।",
    "only a single official holds every power एक अफसर के पास सारी सत्ता संघवाद नहीं।"
  ],
  "The parliamentary form of government means that": [
    "संसदीय शासन: लोग प्रतिनिधि चुनते हैं और सरकार विधायिका को जवाब देती है।",
    "a king rules with no election and no duty to explain himself बिना चुनाव का राजा संसदीय रूप नहीं।"
  ],
  "Separation of powers means that": [
    "शक्ति पृथक्करण: विधायिका, कार्यपालिका और न्यायपालिका के काम अलग-अलग हैं।",
    "one person makes the law, applies it, and judges it with no check एक हाथ में तीनों काम पृथक्करण नहीं।"
  ],
  "Which of these is a Fundamental Right?": [
    "समानता का अधिकार मूल अधिकार है। अस्पृश्यता का अधिकार नहीं, वह मिटाई गई है।",
    "The right to practise untouchability अस्पृश्यता मूल अधिकार नहीं।"
  ],
  "The right to freedom, the right against exploitation, and cultural and educational rights are": [
    "स्वतंत्रता, शोषण के विरुद्ध, और सांस्कृतिक-शैक्षिक अधिकार भारत के मूल अधिकार हैं।",
    "taxes collected by the East India Company कंपनी के कर मूल अधिकार नहीं थे।"
  ],
  "The right to freedom of religion means that": [
    "धर्म की स्वतंत्रता मतलब लोग अपनी आस्था मान और उसका आचरण कर सकते हैं।",
    "the state must impose one religion on everyone एक धर्म सब पर थोपना यह अधिकार नहीं।"
  ],
  "The Right to Constitutional Remedies allows a citizen to": [
    "संवैधानिक उपचार: मूल अधिकार टूटे तो नागरिक अदालत जा सकता है।",
    "cancel the Constitution by a private letter निजी चिट्ठी से संविधान रद्द नहीं होता।"
  ],
  "Directive Principles differ from Fundamental Rights because they": [
    "नीति निर्देशक सिद्धांत सरकार का मार्गदर्शन करते हैं, अदालत से मूल अधिकारों की तरह सीधे लागू नहीं होते।",
    "are the only rules a court is allowed to enforce अदालत सीधे मूल अधिकार लागू करती है, सिर्फ निर्देशक सिद्धांत नहीं।"
  ],
  "The Indian Constitution came into effect on": [
    "संविधान लागू 26 जनवरी 1950 को हुआ। 15 अगस्त 1947 आज़ादी है, गणतंत्र दिवस नहीं।",
    "15 August 1947 पंद्रह अगस्त आज़ादी है। संविधान की ताकत 26 जनवरी 1950 को आई।"
  ],
  "The Constituent Assembly adopted the Constitution on": [
    "संविधान सभा ने संविधान 26 नवम्बर 1949 को अंगीकृत किया। लागू 26 जनवरी 1950 को हुआ।",
    "26 January 1950 यह लागू होने का दिन है, अंगीकार का नहीं।"
  ],
  "Dr B.R. Ambedkar was": [
    "डॉ. आंबेडकर संविधान की प्रारूप समिति के अध्यक्ष थे। पहला वायसराय कैनिंग था।",
    "the first Viceroy of India पहला वायसराय लॉर्ड कैनिंग बना, आंबेडकर नहीं।"
  ],
  "Dr Rajendra Prasad is remembered here as": [
    "डॉ. राजेंद्र प्रसाद संविधान सभा के अध्यक्ष थे। प्रारूप समिति आंबेडकर की थी।",
    "Chairman of the Drafting Committee प्रारूप समिति की कुर्सी आंबेडकर की थी, प्रसाद की नहीं।"
  ],
  "A law that violates Fundamental Rights can be": [
    "जो कानून मूल अधिकार तोड़े, अदालत उसे रद्द कर सकती है। संविधान से ऊपर कोई साधारण कानून नहीं।",
    "placed above the Constitution साधारण कानून संविधान के सिंहासन पर नहीं बैठता।"
  ],
  "Secularism, as a feature of this Constitution, means that": [
    "पंथनिरपेक्षता: राज्य किसी एक धर्म को राजधर्म नहीं बनाता। विश्वास पर रोक नहीं।",
    "all religious belief is banned सारा धार्मिक विश्वास मना करना पंथनिरपेक्षता नहीं।"
  ],
  "The Preamble of the Constitution opens with the words": [
    "प्रस्तावना के पहले शब्द हैं: हम, भारत के लोग। कंपनी का आदेश नहीं।",
    "By order of the East India Company ईस्ट इंडिया कंपनी का हुक्म प्रस्तावना नहीं खोलता।"
  ],
  "Which pairing of organs is correct?": [
    "विधायिका कानून बनाती है, न्यायपालिका उनका अर्थ लगाती है। दीवानी राजस्व अदालत नहीं वसूलती।",
    "The judiciary collects the land revenue of Bengal बंगाल की दीवानी आज की अदालत का काम नहीं।"
  ],
  "Fundamental Rights matter in daily life because": [
    "मूल अधिकार रोज़मर्रा में इसलिए मायने रखते हैं क्योंकि टूटने पर अदालत उन्हें लागू कर सकती है।",
    "they allow the practice of untouchability अस्पृश्यता ये अधिकार नहीं देते। अनुच्छेद 17 उसे मिटाता है।"
  ],
  "The Indian Constitution was framed by": [
    "भारतीय संविधान संविधान सभा ने बनाया। 1600 की कंपनी या जनरल डायर ने नहीं।",
    "General Dyer in 1919 जनरल डायर 1919 जलियाँवाला बाग के हैं, संविधान के लेखक नहीं।"
  ],
  "Indian secularism means that the state": [
    "भारतीय पंथनिरपेक्षता: राज्य किसी एक धर्म को बढ़ावा नहीं देता। राजधर्म नहीं बनाता।",
    "must adopt one official religion एक राजधर्म अपनाना इस विचार को तोड़ता है।"
  ],
  "The Indian state keeps a distance from religion so that": [
    "राज्य धर्म से दूरी रखता है ताकि हर आस्था के लोग बराबर माने जाएँ।",
    "one community can use the government against the others सरकार को एक समुदाय के हथियार बनाना दूरी नहीं।"
  ],
  "Which statement about Indian secularism is correct?": [
    "यह धर्म से दुश्मनी नहीं। लोग अपनी आस्था मानने के लिए आज़ाद रहते हैं।",
    "It means the state hates every religion and bans worship नफरत और पूजा पर रोक इसका मतलब नहीं।"
  ],
  "The state may intervene in a religious matter when": [
    "राज्य धर्म के मामले में तब दखल देता है जब कोई प्रथा मूल अधिकार तोड़े।",
    "a family prays peacefully inside a private home घर में शांत प्रार्थना दखल का कारण नहीं।"
  ],
  "Untouchability was banned because": [
    "अस्पृश्यता मिटाई गई क्योंकि वह समानता और गरिमा छीनती है। रिवाज़ कहने से नहीं बचती। अनुच्छेद 17।",
    "the Constitution orders every person to practise it संविधान अस्पृश्यता करने का हुक्म नहीं देता।"
  ],
  "A government school goes against secularism if it": [
    "सरकारी स्कूल पंथनिरपेक्षता तोड़ता है अगर एक धर्म की पूजा जबरन करवाए।",
    "teaches pupils of every faith in the same classroom हर आस्था के बच्चे एक कक्षा में पढ़ें, यह साथ है।"
  ],
  "In French state schools, pupils are not allowed to wear": [
    "फ्रांस के सरकारी स्कूलों में बच्चे दिखावटी धार्मिक चिह्न नहीं पहन सकते। चश्मा मना नहीं।",
    "ordinary reading glasses साधारण पढ़ने का चश्मा धार्मिक चिह्न नहीं।"
  ],
  "The French rule about religious signs aims to": [
    "फ्रांस का नियम राज्य के स्कूलों से धर्म को बाहर रखना चाहता है।",
    "make one religion compulsory in every class एक धर्म हर कक्षा में अनिवार्य करना इसका लक्ष्य नहीं।"
  ],
  "Indian secularism differs from that stricter French model because India": [
    "भारत धार्मिक समुदायों को कुछ आज़ादी देता है और अल्पसंख्यक स्कूलों की मदद कर सकता है।",
    "makes one religion the official religion of the country एक राजधर्म फ्रांसीसी सख्ती का भारतीय जवाब नहीं।"
  ],
  "The Indian state may help minority schools in order to": [
    "राज्य अल्पसंख्यक स्कूलों की मदद उनके शिक्षा के अधिकार की रक्षा के लिए कर सकता है।",
    "force those communities to abandon their religion धर्म छोड़ने की जबरदस्ती मदद नहीं।"
  ],
  "Discrimination on the ground of religion is": [
    "धर्म के आधार पर भेदभाव संविधान मना करता है। बहुमत के वोट से जायज़ नहीं हो जाता।",
    "allowed whenever the majority votes for it बहुमत का वोट भेदभाव को कानूनी नहीं बनाता।"
  ],
  "One aim of Indian secularism is to prevent": [
    "एक लक्ष्य है कि एक धार्मिक समुदाय दूसरे पर हावी न हो। घर का त्योहार मना नहीं।",
    "every private festival inside a home घर का निजी त्योहार रोकना लक्ष्य नहीं।"
  ],
  "Indian secularism also tries to stop domination": [
    "हावी होना धर्म के अंदर भी रोका जाता है, जैसे अस्पृश्यता पर रोक।",
    "of pupils who study mathematics गणित पढ़ने वाले विद्यार्थी इस हावी होने की मिसाल नहीं।"
  ],
  "In a secular state the majority community": [
    "पंथनिरपेक्ष राज्य में बहुसंख्यक अपनी आस्था दूसरों पर राज्य से नहीं थोप सकते।",
    "has a right to make its faith the official religion अपनी आस्था को राजधर्म बनाने का हक नहीं।"
  ],
  "A person of any faith has the right to": [
    "किसी भी आस्था का व्यक्ति उस आस्था को मान और उसका आचरण कर सकता है।",
    "be punished merely for holding it सिर्फ आस्था रखने पर सज़ा यह अधिकार नहीं।"
  ],
  "Which action fits Indian secularism?": [
    "जो प्रथा मूल अधिकार तोड़े, राज्य उसे रोके। यही भारतीय पंथनिरपेक्षता में बैठता है।",
    "The state chooses one official religion एक राजधर्म चुनना इस विचार में नहीं बैठता।"
  ],
  "Which action does not fit Indian secularism?": [
    "जो दुश्मनी सारा धार्मिक विश्वास मिटाना चाहे, वह भारतीय पंथनिरपेक्षता में नहीं बैठती।",
    "Equal respect for people of every religion हर धर्म के लोगों का समान सम्मान इसमें बैठता है।"
  ],
  "Government offices should": [
    "सरकारी दफ्तर एक धर्म का प्रचार करने के लिए इस्तेमाल नहीं होने चाहिए।",
    "display the rites of only one faith as the state faith एक आस्था को राजधर्म की तरह दिखाना दफ्तर का काम नहीं।"
  ],
  "Principled distance means that the state": [
    "सिद्धांत की दूरी: राज्य धर्म से अलग रहे, पर आस्था का दुश्मन न बने।",
    "merges itself with one religion एक धर्म में मिल जाना दूरी नहीं।"
  ],
  "Opening public jobs to people of every religion supports": [
    "हर धर्म के लोगों के लिए सार्वजनिक नौकरियाँ नागरिकों की समानता को सहारा देती हैं।",
    "the practice of untouchability अस्पृश्यता समानता नहीं, वह मिटाई गई है।"
  ],
  "Freedom of religion does not allow a community to": [
    "धर्म की आज़ादी किसी समुदाय को दूसरों के मूल अधिकार तोड़ने की छूट नहीं देती।",
    "celebrate its own festival in peace शांति से अपना त्योहार मनाना मना नहीं।"
  ],
  "If a custom humiliates a group of people, the secular state": [
    "जो रिवाज़ लोगों को अपमानित करे, पंथनिरपेक्ष राज्य उनके मूल अधिकार बचाने दखल दे सकता है।",
    "must defend the custom because no custom can ever be questioned कोई रिवाज़ सवाल से ऊपर नहीं।"
  ],
  "Minority educational institutions have a place in Indian secularism because": [
    "अल्पसंख्यक शिक्षण संस्थाएँ इसलिए हैं कि समुदाय अपनी संस्कृति और शिक्षा बचा सकें।",
    "minorities are forbidden to open any school अल्पसंख्यकों के लिए स्कूल मना नहीं हैं।"
  ],
  "The best short description of Indian secularism is": [
    "सब धर्मों का समान सम्मान, और मूल अधिकार तोड़ने वाली प्रथा रोकने की जगह।",
    "one official religion for the whole country पूरे देश का एक राजधर्म यह वर्णन नहीं।"
  ],
  "The Lok Sabha represents the people because its members are": [
    "लोकसभा लोगों का प्रतिनिधित्व करती है क्योंकि सदस्य जनता चुनती है।",
    "appointed by a foreign trading company विदेशी व्यापार कंपनी सीटें नहीं बाँटती।"
  ],
  "The national government is formed by": [
    "राष्ट्रीय सरकार वही दल या गठबंधन बनाता है जिसके पास लोकसभा में बहुमत हो।",
    "the party with the fewest seats सबसे कम सीटों वाला दल सरकार नहीं बनाता।"
  ],
  "The Prime Minister is": [
    "प्रधानमंत्री बहुमत वाले दल या सत्तारूढ़ गठबंधन का नेता होता है। मुख्य न्यायाधीश नहीं।",
    "the chief judge of the Supreme Court सुप्रीम कोर्ट का मुख्य न्यायाधीश प्रधानमंत्री नहीं।"
  ],
  "Question Hour matters because": [
    "प्रश्नकाल में सदस्य मंत्रियों से सवाल करते हैं और सरकार को जवाब देना पड़ता है।",
    "it is a time when every question is forbidden जब हर सवाल मना हो, वह प्रश्नकाल नहीं।"
  ],
  "By questions, debates, and committees, Parliament": [
    "सवाल, बहस और समितियों से संसद सरकार पर नियंत्रण रखती है और जनता को जानकारी देती है।",
    "collects the Diwani for the East India Company बंगाल की दीवानी आज की संसद का काम नहीं।"
  ],
  "Members of the Lok Sabha are": [
    "लोकसभा के सदस्य जनता सीधे चुनती है। जन्म से सीट नहीं मिलती।",
    "born into their seats जन्म से सीट पाना लोकसभा नहीं।"
  ],
  "The Rajya Sabha represents": [
    "राज्यसभा भारत के राज्यों का प्रतिनिधित्व करती है। लंदन या कंपनी का बोर्ड नहीं।",
    "only the city of London सिर्फ लंदन राज्यसभा का क्षेत्र नहीं।"
  ],
  "A bill becomes an Act when": [
    "विधेयक कानून तब बनता है जब संसद उसे पास करे और राष्ट्रपति स्वीकृति दें।",
    "a newspaper prints a rumour अखबार की अफवाह कानून नहीं बनती।"
  ],
  "In India, the laws made by Parliament apply to": [
    "संसद के कानून सब पर लागू होते हैं, ऊँचे पद वालों पर भी। सिर्फ गरीबों पर नहीं।",
    "only the poor सिर्फ गरीबों पर कानून और बाकी को छूट, यह नियम नहीं।"
  ],
  "The rule of law means that": [
    "विधि का शासन: कोई व्यक्ति कानून से ऊपर नहीं। प्रधानमंत्री भी क़ानून नहीं तोड़ सकता।",
    "the Prime Minister may ignore every statute प्रधानमंत्री हर क़ानून अनदेखा नहीं कर सकता।"
  ],
  "If citizens believe a law is unjust, they may": [
    "नागरिक अन्यायपूर्ण कानून की आलोचना कर सकते हैं और संसद से बदलाव माँग सकते हैं।",
    "be forbidden to speak or to meet about it बोलना और मिलना मना करना उनका हक नहीं छीनता।"
  ],
  "Parliament can change an unjust law because": [
    "संसद राष्ट्रीय कानून बनाने वाली संस्था है, इसलिए नया कानून पास कर अन्यायपूर्ण कानून बदल सकती है।",
    "only a foreign queen may change an Indian law today आज विदेशी रानी भारतीय कानून नहीं बदलती।"
  ],
  "The Protection of Women from Domestic Violence Act is a useful example because": [
    "घरेलू हिंसा से महिलाओं का संरक्षण कानून जनमाँग, खासकर महिला समूहों, के सालों बाद संसद ने पास किया।",
    "the East India Company issued it in 1600 1600 की कंपनी ने यह कानून नहीं निकाला।"
  ],
  "An unconstitutional law can be": [
    "जो कानून संविधान तोड़े, अदालत उसे रद्द कर सकती है। भाषण से संविधान से ऊपर नहीं हो जाता।",
    "made stronger than the Constitution by a speech एक भाषण कानून को संविधान से बड़ा नहीं करता।"
  ],
  "The opposition in Parliament": [
    "संसद में विपक्ष सरकार से सवाल करता है और उसकी असफलताएँ दिखाता है।",
    "is forbidden to speak विपक्ष का मुँह बंद करना उसका काम नहीं।"
  ],
  "A coalition is needed when": [
    "गठबंधन तब चाहिए जब किसी एक दल के पास बहुमत न हो, इसलिए दल मिलकर शासन करें।",
    "the group with no seats rules alone बिना सीट का समूह अकेला शासन नहीं करता।"
  ],
  "Universal adult franchise in elections to the Lok Sabha means that": [
    "लोकसभा के चुनाव में सार्वभौमिक वयस्क मताधिकार: 18 साल या उससे बड़े नागरिकों को वोट का हक।",
    "only men who own large estates may vote सिर्फ बड़े ज़मींदार पुरुषों का वोट यह अधिकार नहीं।"
  ],
  "The Prime Minister and the Council of Ministers are": [
    "प्रधानमंत्री और मंत्रिपरिषद लोकसभा के प्रति उत्तरदायी हैं। बहुमत वहीं सरकार बनाता है।",
    "free of any duty to explain their actions जवाब देने की ड्यूटी से आज़ाद मंत्रिपरिषद नहीं होती।"
  ],
  "Together with the two Houses, Parliament also includes": [
    "दोनों सदनों के साथ संसद में राष्ट्रपति भी शामिल हैं। सुप्रीम कोर्ट नहीं।",
    "only the Supreme Court सिर्फ सुप्रीम कोर्ट संसद का तीसरा अंग नहीं।"
  ],
  "Citizens take part in law-making when they": [
    "नागरिक प्रतिनिधि चुनकर और ज़रूरी कानूनों के लिए अभियान चलाकर कानून बनाने में हिस्सा लेते हैं।",
    "leave every decision to a foreign trading company हर फैसला विदेशी कंपनी को सौंपना हिस्सा लेना नहीं।"
  ],
  "A money bill is introduced in the Lok Sabha because": [
    "धन विधेयक लोकसभा में आता है क्योंकि सीधे चुना सदन कर और खर्च पर मुख्य आवाज़ रखता है।",
    "only the Rajya Sabha may tax the people, with no role for the Lok Sabha सिर्फ राज्यसभा कर लगाए, यह उल्टा है।"
  ],
  "The Rajya Sabha differs from the Lok Sabha because": [
    "राज्यसभा राज्यों का प्रतिनिधित्व करती है और सब लोगों द्वारा सीधे नहीं चुनी जाती।",
    "every adult votes for it in the same direct way हर वयस्क का सीधा वोट लोकसभा वाला तरीका है।"
  ],
  "Before a proposal is passed and becomes law, it is called": [
    "पास होकर कानून बनने से पहले प्रस्ताव को विधेयक कहते हैं। एफआईआर नहीं।",
    "an FIR एफआईआर पुलिस की पहली सूचना है, विधेयक नहीं।"
  ],
  "The final assent that turns a passed bill into an Act is given by": [
    "पास विधेयक को अधिनियम बनाने वाली आखिरी स्वीकृति राष्ट्रपति देते हैं।",
    "the public prosecutor लोक अभियोजक राष्ट्रपति की स्वीकृति नहीं देता।"
  ],
  "An independent judiciary means that judges": [
    "स्वतंत्र न्यायपालिका: न्यायाधीश सरकार के दबाव बिना फैसला करते हैं।",
    "take a minister's order on every verdict हर फैसले पर मंत्री का आदेश स्वतंत्रता नहीं।"
  ],
  "Judicial independence matters because it": [
    "न्यायिक स्वतंत्रता अधिकार तब भी बचाती है जब मुकदमा खुद सरकार के खिलाफ हो।",
    "lets ministers write the judgment मंत्री फैसला लिखें तो स्वतंत्रता नहीं बचती।"
  ],
  "Dispute resolution by the courts means that they": [
    "अदालतें विवाद कानून के अनुसार निपटाती हैं। बंगाल की दीवानी नहीं वसूलतीं।",
    "collect the Diwani of Bengal दीवानी वसूलना कंपनी का पुराना काम है, अदालत का नहीं।"
  ],
  "Which of these disputes can come before a court?": [
    "अदालत के सामने दो नागरिकों का, या नागरिक और सरकार का विवाद आ सकता है।",
    "A request to change the weather मौसम बदलने की अर्ज़ी मुकदमा नहीं।"
  ],
  "Judicial review is the power to": [
    "न्यायिक पुनरावलोकन: देखना कि कानून संविधान से मेल खाता है या नहीं।",
    "review a film for a cinema hall सिनेमा की फिल्म समीक्षा यह शक्ति नहीं।"
  ],
  "If a law breaks the Constitution, the Supreme Court may": [
    "जो कानून संविधान तोड़े, सुप्रीम कोर्ट उसे रद्द कर सकता है।",
    "hide the law and still enforce it कानून छिपाकर लागू करना रद्द करना नहीं।"
  ],
  "When courts uphold Fundamental Rights, they": [
    "अदालतें मूल अधिकारों की रक्षा करती हैं अगर कोई उन्हें तोड़े। अस्पृश्यता की इजाज़त नहीं देतीं।",
    "permit the practice of untouchability अस्पृश्यता की इजाज़त देना अधिकारों की रक्षा नहीं।"
  ],
  "The highest court in India is": [
    "भारत की सबसे ऊँची अदालत सुप्रीम कोर्ट है। साप्ताहिक बाज़ार नहीं।",
    "a weekly village market गाँव का साप्ताहिक बाज़ार अदालत नहीं।"
  ],
  "High Courts are": [
    "उच्च न्यायालय राज्यों के स्तर की सबसे ऊँची अदालतें हैं।",
    "trading posts of the East India Company कंपनी की कोठियाँ उच्च न्यायालय नहीं।"
  ],
  "District courts belong to": [
    "ज़िला अदालतें अधीनस्थ अदालतें हैं जो स्थानीय मामले सुनती हैं।",
    "the house that represents the states राज्यों वाला सदन राज्यसभा है, ज़िला अदालत नहीं।"
  ],
  "India has an integrated judicial system. This means that": [
    "एकीकृत व्यवस्था: अदालतें एक पिरामिड हैं, ऊपर का फैसला नीचे की अदालतों को बाँधता है।",
    "each village has its own supreme court with no appeal हर गाँव का अलग सुप्रीम कोर्ट यह व्यवस्था नहीं।"
  ],
  "A person who loses a case in a lower court may": [
    "निचली अदालत में हारने वाला ऊँची अदालत में अपील कर सकता है।",
    "become the Prime Minister automatically हारते ही प्रधानमंत्री बनना अपील नहीं।"
  ],
  "Public interest litigation lets a person": [
    "जनहित याचिका सार्वजनिक मुद्दे पर उच्च न्यायालय या सुप्रीम कोर्ट जाने देती है, सिर्फ निजी चोट पर नहीं।",
    "file a case only about his or her own private shop सिर्फ अपनी दुकान का मुकदमा जनहित नहीं।"
  ],
  "PIL has been important because": [
    "जनहित याचिका इसलिए महत्वपूर्ण है कि प्रभावित लोग खुद दाखिल न कर पाएँ तो भी सार्वजनिक गलती अदालत तक पहुँचे।",
    "it stops poor people from ever seeing a judge गरीबों को जज से दूर रखना इसका फायदा नहीं।"
  ],
  "An FIR is": [
    "एफआईआर संज्ञेय अपराध की पहली सूचना है जिसे पुलिस दर्ज करती है। कंपनी का चार्टर नहीं।",
    "the charter of the East India Company 1600 का चार्टर एफआईआर नहीं।"
  ],
  "The FIR is given to": [
    "एफआईआर पुलिस को दी जाती है। स्पीकर को धन विधेयक की तरह नहीं।",
    "the Speaker, as if it were a money bill स्पीकर के पास एफआईआर धन विधेयक नहीं बनती।"
  ],
  "In a criminal trial the public prosecutor": [
    "फौजदारी मुकदमे में लोक अभियोजक राज्य का प्रतिनिधित्व करता है। जज नहीं बनता।",
    "is the judge of the case अभियोजक और जज एक कुर्सी पर नहीं बैठते।"
  ],
  "During a trial the judge": [
    "मुकदमे में जज पक्ष नहीं लेता। सबूत और कानून देखकर फैसला करता है।",
    "must support the police even when there is no evidence बिना सबूत पुलिस का साथ देना न्याय नहीं।"
  ],
  "A criminal case deals with": [
    "फौजदारी मामला समाज के खिलाफ अपराध है, जैसे चोरी या हमला। खेत की निजी सीमा नहीं।",
    "only a private argument about the boundary of a field, with no crime बिना अपराध खेत की सीमा दीवानी जैसी बात है।"
  ],
  "A civil case deals with": [
    "दीवानी मामला व्यक्तियों का विवाद है, जैसे संपत्ति या करार। राज्य की हत्या का मुकदमा नहीं।",
    "a murder prosecuted by the state as a crime against society हत्या का राजकीय मुकदमा फौजदारी है।"
  ],
  "An accused person is": [
    "आरोपी तब तक निर्दोष माना जाता है जब तक आरोप साबित न हो। पड़ोसी की शिकायत से दोषी नहीं।",
    "treated as guilty the moment a neighbour complains पड़ोसी की शिकायत पर तुरंत दोषी मानना गलत है।"
  ],
  "The right to defend oneself means that the accused": [
    "बचाव का अधिकार: आरोपी वकील रख सकता है और सबूत को चुनौती दे सकता है।",
    "must stay silent while the police write the verdict पुलिस फैसला लिखे और आरोपी चुप रहे, यह बचाव नहीं।"
  ],
  "Which order of courts runs from the top downward?": [
    "ऊपर से नीचे: सुप्रीम कोर्ट, उच्च न्यायालय, फिर अधीनस्थ अदालतें।",
    "Subordinate courts, High Courts, Supreme Court यह क्रम उल्टा है, नीचे से ऊपर चढ़ाई।"
  ],
  "The public prosecutor is expected to": [
    "लोक अभियोजक से उम्मीद है कि मामला निष्पक्ष रखे। जीत नहीं, न्याय लक्ष्य है।",
    "hide evidence that would help the accused आरोपी की मदद करने वाला सबूत छिपाना निष्पक्ष नहीं।"
  ],
  "Marginalisation means that a community is": [
    "हाशिये पर धकेलना ही marginalisation है। संसाधन और अधिकार कम पड़ते हैं।",
    "given every advantage in schools and jobs स्कूल और नौकरी का हर फायदा हाशिया नहीं, उसका उल्टा है।"
  ],
  "Many Adivasi communities have been marginalised by": [
    "जंगल और ज़मीन खदान, बाँध और सख्त वन-नियमों में चली गई। आदिवासी हाशिये पर।",
    "a gift of the best farmland with no displacement at all बेहतरीन खेत बिना बेदखली हाशिया नहीं।"
  ],
  "Adivasi communities of India are": [
    "आदिवासी कई समूह हैं, अपनी भाषा और रीति के साथ। एक गुट, एक भाषा नहीं।",
    "one single group with only one language and no traditions एक भाषा और कोई रीति नहीं, यह तस्वीर गलत है।"
  ],
  "The Class 8 textbook discusses marginalisation faced by": [
    "किताब आदिवासी समुदायों और कुछ मुस्लिम समुदायों के हाशिये की बात करती है।",
    "only the richest industrial families सबसे अमीर उद्योग-परिवार इस अध्याय के हाशिये वाले नहीं।"
  ],
  "The Sachar Committee is important in this chapter because it": [
    "सच्चर समिति ने मुसलमानों की सामाजिक, आर्थिक और शिक्षा की हालत बताई।",
    "wrote the royal charter of 1600 1600 का शाही चार्टर कंपनी का है, सच्चर का नहीं।"
  ],
  "Article 17 of the Constitution": [
    "अनुच्छेद 17 अस्पृश्यता मिटाता है। छुआछूत अब अधिकार नहीं, अपराध है।",
    "creates the East India Company कंपनी 1600 के चार्टर से बनी, अनुच्छेद 17 से नहीं।"
  ],
  "Practising untouchability is": [
    "छुआछूत करना मना है और सज़ा वाला अपराध है। मौलिक अधिकार नहीं।",
    "a Fundamental Right मौलिक अधिकार समानता देता है, छुआछूत का हुक्म नहीं।"
  ],
  "The Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act punishes": [
    "यह कानून उन समुदायों पर हिंसा और अपमान को सज़ा देता है।",
    "a child for attending school स्कूल जाना अपराध नहीं, बच्चे का अधिकार है।"
  ],
  "Manual scavenging is": [
    "हाथ से मैला उठाना कानून से मना है। सम्मान नहीं, अपमान है।",
    "a public honour सार्वजनिक सम्मान कहना इस काम का मज़ाक है।"
  ],
  "Seats reserved in education and government jobs for Scheduled Castes and Scheduled Tribes are meant to": [
    "आरक्षण लंबे बहिष्कार को घटाकर समानता की ओर ले जाता है। सज़ा नहीं।",
    "punish those communities उन समुदायों को सज़ा देना आरक्षण का मकसद नहीं।"
  ],
  "Cultural and educational rights allow a minority to": [
    "अल्पसंख्यक अपना शिक्षण संस्थान खोल और चला सकते हैं।",
    "be barred from every school हर स्कूल से रोकना इस अधिकार का उल्टा है।"
  ],
  "Which list is made up of public facilities?": [
    "पानी, स्वास्थ्य, सफाई, बिजली, बस-ट्रेन, स्कूल और कॉलेज सार्वजनिक सुविधाएँ हैं।",
    "Only one family's locked private well एक परिवार का ताला-लगा कुआँ सबकी सुविधा नहीं।"
  ],
  "The government must provide public facilities because": [
    "निजी कंपनी गरीब को छोड़ सकती है, इसलिए सरकार पानी, स्वास्थ्य और स्कूल दे।",
    "private firms always supply the poor free of cost निजी फर्म गरीब को हमेशा मुफ्त नहीं देतीं।"
  ],
  "Equity means": [
    "इक्विटी यानी ज़रूरत के हिसाब से देना, ताकि लोग बराबर खड़े हो सकें।",
    "giving identical things and ignoring very different needs सबको एक जैसी चीज़, अलग ज़रूरत अनदेखी, इक्विटी नहीं।"
  ],
  "Chennai is used as an example of water because": [
    "चेन्नई में पानी असमान है। जो दे सके टैंकर खरीदे, गरीब इलाके कम पाएँ।",
    "every lane receives the same plentiful free supply and nobody is short हर गली में भरपूर मुफ्त पानी इस उदाहरण का उल्टा है।"
  ],
  "Safe water is linked to the right to life because": [
    "बिना सुरक्षित पानी गरिमा से जीना मुश्किल। यह जीवन के अधिकार से जुड़ा है।",
    "water is a luxury with no link to life पानी लग्ज़री नहीं, जीवन की ज़रूरत है।"
  ],
  "Sulabh is known for its work on": [
    "सुलभ सफाई और सस्ते शौचालय के लिए जाना जाता है, हाथ से मैला ढोने के खिलाफ।",
    "the steel mills of Pittsburgh पिट्सबर्ग की स्टील मिलें सुलभ का काम नहीं।"
  ],
  "Public transport counts as a public facility because": [
    "बस और रेल उसे भी सफ़र कराती हैं जिसके पास अपनी गाड़ी नहीं।",
    "it is built for one wealthy family and locked to everyone else एक अमीर परिवार का ताला सार्वजनिक सफ़र नहीं।"
  ],
  "Government schools and colleges support equality when": [
    "जो ऊँची फीस नहीं दे सकता, वह भी सरकारी स्कूल-कॉलेज में पढ़ सके।",
    "they admit only the rich सिर्फ अमीरों का दाखिला समानता को तोड़ता है।"
  ],
  "Health care is treated as a public facility because": [
    "बीमारी अमीर बनने का इंतज़ार नहीं करती। इलाज सिर्फ पैसे वालों के लिए नहीं।",
    "the law must turn the poor away from every hospital गरीब को हर अस्पताल से भगाना कानून का हुक्म नहीं।"
  ],
  "Sanitation is a public concern because": [
    "गंदा कचरा पूरे मोहल्ले में बीमारी फैलाता है। शौचालय निजी शौक नहीं।",
    "dirt never affects anyone beyond a single person गंदगी सिर्फ एक आदमी तक रुके, यह सच नहीं।"
  ],
  "When public facilities fail, marginalised groups are hurt more because": [
    "हाशिये वाले निजी विकल्प कम खरीद पाते हैं। अमीर टैंकर ले लेता है।",
    "they can buy private services more easily than the rich गरीब अमीर से आसान निजी सेवा खरीद ले, यह उल्टा है।"
  ],
  "A private company may skip a poor neighbourhood because": [
    "गरीब मोहल्ले में मुनाफा कम दिखे तो निजी कंपनी उसे छोड़ सकती है।",
    "profit never influences a private business मुनाफा निजी धंधे को नहीं छूता, यह मज़ाक है।"
  ],
  "Laws such as the Prevention of Atrocities Act matter because": [
    "पीड़ित हिंसा और अपमान के खिलाफ अदालत का रास्ता पाते हैं।",
    "they protect the person who commits the humiliation अपमान करने वाले को बचाना इस कानून का काम नहीं।"
  ],
  "In 1600 the East India Company received its charter from": [
    "1600 में महारानी एलिज़ाबेथ प्रथम ने कंपनी को चार्टर दिया।",
    "Bahadur Shah Zafar बहादुर शाह ज़फ़र 1857 के बादशाह हैं, 1600 के चार्टर वाले नहीं।"
  ],
  "The charter gave the Company": [
    "चार्टर अंग्रेज़ व्यापारियों में सिर्फ कंपनी को पूर्व से व्यापार का हक देता था।",
    "the Diwani of Bengal in that same year बंगाल की दीवानी उसी साल नहीं, 1765 में मिली।"
  ],
  "The Company first came to India in order to": [
    "कंपनी पहले व्यापार करने आई। शासन और भारत छोड़ो बाद की बातें हैं।",
    "launch the Quit India Movement भारत छोड़ो 1942 का आंदोलन है, 1600 का नहीं।"
  ],
  "The Company's main European rivals in this story were": [
    "पुर्तगाली, डच और फ्रांसीसी कंपनी के यूरोपीय प्रतिद्वंद्वी थे।",
    "the Indian National Congress and the Muslim League कांग्रेस और मुस्लिम लीग बहुत बाद के दल हैं।"
  ],
  "In the Company's language, a factory was": [
    "कंपनी की फैक्टरी गोदाम और व्यापारी चौकी थी, भट्ठी वाली स्टील मिल नहीं।",
    "a modern steel mill with a blast furnace ब्लास्ट फर्नेस वाली स्टील मिल आधुनिक कारखाना है।"
  ],
  "The Battle of Plassey was fought in": [
    "57 पलासी, 64 बक्सर, 65 दीवानी। इस सवाल का जवाब 1757 है।",
    "1764 1764 बक्सर का साल है, पलासी का नहीं।"
  ],
  "Siraj-ud-daulah was": [
    "सिराज-उद-दौला बंगाल का नवाब था, पलासी में हारा।",
    "the first Viceroy of India पहला वायसराय लॉर्ड कैनिंग है, 1858 में।"
  ],
  "The Company's army at Plassey was led by": [
    "पलासी में कंपनी की फौज रॉबर्ट क्लाइव के साथ थी। मीर जाफ़र साथ छोड़ गया।",
    "Lord Dalhousie लॉर्ड डलहौज़ी व्यपगत का सिद्धांत वाला है, पलासी का सेनापति नहीं।"
  ],
  "After the victory at Plassey, the Company installed": [
    "पलासी के बाद कंपनी ने मीर जाफ़र को बंगाल का नवाब बैठाया।",
    "Bahadur Shah Zafar as Viceroy बहादुर शाह ज़फ़र वायसराय नहीं बने।"
  ],
  "The Battle of Buxar was fought in": [
    "64 बक्सर। 57 पलासी से सात साल बाद की साफ जीत, साल 1764।",
    "1757 1757 पलासी है, बक्सर को 1757 मत लिखना।"
  ],
  "At Buxar the Company defeated": [
    "बक्सर में मीर कासिम, अवध का शुजा और शाह आलम द्वितीय हारे।",
    "only Tipu Sultan at Srirangapatna in 1799 टीपू 1799 में श्रीरंगपट्टनम पर लड़े, बक्सर पर नहीं।"
  ],
  "The Company received the Diwani of Bengal in": [
    "65 दीवानी। 57 पलासी, 64 बक्सर, फिर 1765 में टैक्स वसूलने का हक।",
    "1600 1600 चार्टर है, दीवानी नहीं।"
  ],
  "Diwani means": [
    "दीवानी यानी ज़मीन का लगान वसूलने का हक। बंगाल का टैक्स कंपनी की झोली में।",
    "a ban on religious signs in French state schools फ्रांसीसी स्कूलों में धार्मिक चिह्न रोकना दीवानी नहीं।"
  ],
  "The Doctrine of Lapse is linked with": [
    "व्यपगत का सिद्धांत लॉर्ड डलहौज़ी का है। गोद लिया बेटा मान्य नहीं।",
    "Queen Elizabeth I महारानी एलिज़ाबेथ ने 1600 का चार्टर दिया, यह सिद्धांत नहीं।"
  ],
  "Under the Doctrine of Lapse the Company could annex a state when": [
    "कुदरती बेटा न हो और राजा मर जाए तो कंपनी राज्य हड़प लेती थी।",
    "the ruler had a living natural son जीवित कुदरती बेटा हो तो व्यपगत नहीं लगता।"
  ],
  "Awadh was taken by the Company in 1856": [
    "अवध 1856 में कुशासन के आरोप पर लिया गया, व्यपगत से नहीं।",
    "under the Doctrine of Lapse, because its ruler had no natural son यह अवध की कहानी नहीं।"
  ],
  "Under a subsidiary alliance the Indian ruler": [
    "सहायक संधि: कंपनी की फौज राजा के इलाके में, खर्च राजा दे।",
    "commanded the Company's army in London लंदन में कंपनी की फौज राजा के हाथ में नहीं थी।"
  ],
  "A subsidiary alliance also required that the ruler": [
    "राजा दूसरी यूरोपीय फौज नहीं रख सकता था, और बिना इजाज़त संधि नहीं कर सकता था।",
    "invite any European power he chose मनचाही यूरोपीय ताकत बुलाना संधि मना करती थी।"
  ],
  "Lord Wellesley is remembered in this chapter for": [
    "वेलेज़ली सहायक संधियाँ फैलाता रहा। राजा की रक्षा कंपनी के हवाले।",
    "founding the Indian National Congress कांग्रेस 1885 में बनी, वेलेज़ली ने नहीं।"
  ],
  "Warren Hastings was": [
    "वॉरेन हेस्टिंग्स बंगाल का पहला गवर्नर-जनरल था। 1773 का रेग्युलेटिंग एक्ट।",
    "the Nawab defeated at Plassey पलासी में हारा नवाब सिराज-उद-दौला है।"
  ],
  "The three presidencies of the Company were": [
    "तीन प्रेसीडेंसी: बंगाल, मद्रास और बम्बई। दिल्ली-कानपुर-झाँसी 1857 के अड्डे हैं।",
    "Delhi, Kanpur, and Jhansi दिल्ली, कानपुर और झाँसी तीन प्रेसीडेंसी नहीं।"
  ],
  "A Resident in this period was": [
    "रेज़ीडेंट कंपनी का अफ़सर था, राजा के दरबार में बैठा निगरानी करता।",
    "a judge of the Supreme Court सुप्रीम कोर्ट का जज रेज़ीडेंट नहीं होता।"
  ],
  "Tipu Sultan of Mysore": [
    "टीपू सुल्तान 1799 में श्रीरंगपट्टनम बचाते हुए मारा गया।",
    "granted the Company its charter in 1600 1600 का चार्टर एलिज़ाबेथ ने दिया, टीपू ने नहीं।"
  ],
  "The Company's claim of paramountcy meant that": [
    "परमौंटसी यानी कंपनी की सत्ता भारतीय राज्यों पर सबसे ऊपर।",
    "every Indian state was fully independent of it हर राज्य कंपनी से पूरी आज़ाद, यह परमौंटसी का उल्टा है।"
  ],
  "One deep cause of the revolt was that peasants": [
    "किसान भारी लगान और ज़मीन के हक छिनने से तंग थे।",
    "were freed from every tax हर टैक्स माफ हो गया था, यह 1857 की कहानी नहीं।"
  ],
  "The annexation of Awadh in 1856 caused anger because": [
    "1856 में अवध का नवाब हटा, सिपाही और तालुकेदार अपनी जगह गँवा बैठे।",
    "Awadh was granted full independence अवध को पूरी आज़ादी नहीं मिली, नवाब हटाया गया।"
  ],
  "The new Enfield cartridges caused unrest because sepoys believed they were": [
    "कारतूस गाय और सुअर की चर्बी से सने बताए गए। दोनों धर्म बुरी तरह भड़के।",
    "made of hand-spun khadi खादी का सूत कारतूस नहीं बनता। खादी बाद का स्वदेशी है।"
  ],
  "Biting the ends of those cartridges was resented because it": [
    "कारतूस का सिरा काटना हिंदू और मुस्लिम सिपाहियों की आस्था को चोट पहुँचाता था।",
    "used only coconut oil, which nobody minded सिर्फ नारियल तेल, जिस पर एतराज़ नहीं, यह गलत याद है।"
  ],
  "The Doctrine of Lapse added to the anger because": [
    "व्यपगत: कुदरती बेटा न हो तो राज्य छिन जाता। झाँसी इसी में गई।",
    "it restored every annexed kingdom कब्ज़ाए राज्य लौटाना इस नियम ने नहीं किया।"
  ],
  "Nana Saheb had a grievance because the British": [
    "नाना साहिब को पेशवा बाजी राव द्वितीय की पेंशन नहीं मिली।",
    "crowned him Viceroy उसे वायसराय नहीं बनाया गया।"
  ],
  "Mangal Pandey": [
    "मंगल पांडे ने बैरकपुर में अफ़सरों पर हमला किया और फाँसी पाई। मेरठ बाद में।",
    "led the Salt March from Sabarmati साबरमती से नमक यात्रा गांधी की है, 1930 में।"
  ],
  "The sepoy rising at Meerut began on": [
    "मेरठ 10 मई 1857। फिर दिल्ली। 13 अप्रैल 1919 जलियाँवाला है।",
    "13 April 1919 13 अप्रैल 1919 जलियाँवाला बाग है, मेरठ नहीं।"
  ],
  "From Meerut the sepoys marched to": [
    "मेरठ से सिपाही दिल्ली गए, बहादुर शाह ज़फ़र के पास।",
    "London लंदन उनका मंजिल नहीं था।"
  ],
  "In Delhi the rebels proclaimed as their leader": [
    "दिल्ली का बादशाह बहादुर शाह ज़फ़र विद्रोह का नेता घोषित हुआ।",
    "Robert Clive रॉबर्ट क्लाइव पलासी 1757 का सेनापति है।"
  ],
  "Rani Lakshmibai led the revolt in": [
    "झाँसी की रानी लक्ष्मीबाई। दिल्ली बादशाह, लखनऊ बेगम, कानपुर नाना, बिहार कुँवर।",
    "London लंदन में रानी की लड़ाई नहीं हुई।"
  ],
  "Nana Saheb was a leader of the revolt at": [
    "कानपुर का नाना साहिब। झाँसी रानी, लखनऊ बेगम, दिल्ली बादशाह, बिहार कुँवर।",
    "Amritsar in 1919 1919 का अमृतसर जलियाँवाला है, नाना का कानपुर नहीं।"
  ],
  "Tantia Tope is remembered as": [
    "तांतिया टोपे नाना साहिब के साथ लड़ने वाला कमांडर था।",
    "the Governor-General who applied the Doctrine of Lapse व्यपगत लगाने वाले गवर्नर-जनरल डलहौज़ी हैं।"
  ],
  "Begum Hazrat Mahal led the revolt in": [
    "लखनऊ की बेगम हज़रत महल। अवध के लिए वही उठीं।",
    "the Madras presidency as its Governor मद्रास प्रेसीडेंसी की गवर्नर बेगम नहीं थीं।"
  ],
  "Kunwar Singh led the revolt in": [
    "बिहार का कुँवर सिंह। जगदीशपुर के बूढ़े ज़मींदार विद्रोह में खड़े हुए।",
    "the Battle of Plassey पलासी 1757 की लड़ाई है, कुँवर सिंह की नहीं।"
  ],
  "The events of 1857 were wider than a mutiny of soldiers alone because": [
    "सिपाहियों के साथ किसान और कुछ राजा भी उठे। अकेली फौजी बगावत नहीं।",
    "only one sepoy in London took part लंदन का एक सिपाही यह विद्रोह नहीं है।"
  ],
  "The revolt did not cover every part of India. This means that": [
    "हर कोना नहीं उठा। कुछ इलाके और कुछ राजा बाहर रहे।",
    "the British left India in May 1857 मई 1857 में अंग्रेज़ भारत छोड़कर नहीं गए।"
  ],
  "The British had suppressed the revolt by": [
    "विद्रोह 1859 तक दबा दिया गया। 1757 पलासी है, 1600 चार्टर।",
    "1757 1757 पलासी है, दबाने का साल नहीं।"
  ],
  "After the revolt, Bahadur Shah Zafar was": [
    "बहादुर शाह ज़फ़र को रंगून भेज दिया गया। वायसराय नहीं बनाया।",
    "made the first Viceroy पहला वायसराय लॉर्ड कैनिंग बना, ज़फ़र नहीं।"
  ],
  "In 1858 the government of India passed from the Company to": [
    "1858 में भारत कंपनी से ब्रिटिश राजमुकुट के पास गया।",
    "the Indian National Congress कांग्रेस 1885 में बनी, 1858 में सत्ता नहीं ली।"
  ],
  "After 1858 the Governor-General also received the title of": [
    "1858 के बाद गवर्नर-जनरल को वायसराय भी कहा गया।",
    "Speaker of the Lok Sabha लोकसभा का स्पीकर वायसराय नहीं होता।"
  ],
  "The first Viceroy of India was": [
    "पहला वायसराय लॉर्ड कैनिंग। क्लाइव पलासी का है, माउंटबेटन आखिरी वायसराय।",
    "Lord Mountbatten लॉर्ड माउंटबेटन आखिरी वायसराय थे, 1947 में।"
  ],
  "Jhansi had been annexed under the Doctrine of Lapse. That helps explain why": [
    "झाँसी व्यपगत से छिनी, इसलिए रानी के पास कंपनी से गहरा दुख था।",
    "Jhansi was never annexed झाँसी कभी नहीं छिनी, यह गलत है। छिनी थी।"
  ],
  "The cartridge dispute and the older grievances fit together because": [
    "कारतूस चिंगारी था। लगान, ज़मीन और कब्ज़े पहले से गुस्सा भर चुके थे।",
    "the only cause was the Rowlatt Act of 1919 रॉलेट एक्ट 1919 का है, 1857 का कारण नहीं।"
  ],
  "The Indian National Congress was founded in": [
    "कांग्रेस 1885। आज़ादी 1947। दोनों को एक साल मत बनाओ।",
    "1942 1942 भारत छोड़ो है, कांग्रेस की स्थापना नहीं।"
  ],
  "Moderate leaders such as Dadabhai Naoroji and Gopal Krishna Gokhale": [
    "नरोजी और गोखले जैसे नरम दल याचिका, भाषण और प्रस्ताव से सुधार माँगते थे।",
    "led the sepoy rising at Meerut मेरठ का सिपाही विद्रोह 1857 का है, इनका नहीं।"
  ],
  "Dadabhai Naoroji argued that": [
    "दादाभाई नरोजी बोले, भारत का धन ब्रिटेन की ओर बह रहा है।",
    "satyagraha had begun in the year 1600 सत्याग्रह 1600 में शुरू नहीं हुआ। 1600 कंपनी का चार्टर है।"
  ],
  "Bal Gangadhar Tilak, Bipin Chandra Pal, and Lala Lajpat Rai were": [
    "तिलक, पाल और लाला लाजपत राय याचिका से आगे, जोरदार कार्रवाई चाहते थे।",
    "opposed to every idea of swaraj स्वराज के खिलाफ नहीं, स्वराज ही इनकी माँग थी।"
  ],
  "Tilak's famous declaration was that": [
    "तिलक का वाक्य: स्वराज मेरा जन्मसिद्ध अधिकार है।",
    "the Diwani is my birthright दीवानी बंगाल का लगान-हक है, तिलक का नारा नहीं।"
  ],
  "Lord Curzon partitioned Bengal in": [
    "कर्जन ने बंगाल 1905 में बाँटा। 1947 की आज़ादी वाला बँटवारा दूसरा है।",
    "1947 1947 आज़ादी है, कर्जन का बँटवारा 1905 है।"
  ],
  "The Swadeshi movement called on people to": [
    "स्वदेशी: विदेशी माल छोड़ो, भारत में बनी चीज़ अपनाओ।",
    "buy only British cloth सिर्फ ब्रिटिश कपड़ा खरीदना स्वदेशी का उल्टा है।"
  ],
  "The partition of Bengal carried out in 1905 was annulled in": [
    "1905 का बंगाल बँटवारा 1911 में रद्द हुआ।",
    "1905 1905 लगाने का साल है, रद्द करने का नहीं।"
  ],
  "Mahatma Gandhi returned to India from South Africa in": [
    "गांधी 1915 में दक्षिण अफ्रीका से लौटे। सत्याग्रह साथ लाए।",
    "1947 1947 आज़ादी है, लौटने का साल नहीं।"
  ],
  "The Rowlatt Act of 1919": [
    "1919 का रॉलेट एक्ट बिना मुकदमे हिरासत की इजाज़त देता था। काला कानून।",
    "abolished the tax on salt नमक कर खत्म नहीं हुआ। गांधी ने 1930 में उसे तोड़ा।"
  ],
  "On 13 April 1919 at Jallianwala Bagh in Amritsar": [
    "13 अप्रैल 1919, जलियाँवाला बाग। जनरल डायर ने भीड़ पर गोलियाँ चलवाईं।",
    "Gandhi made salt and broke the salt law नमक कानून गांधी ने 1930 में दांडी पर तोड़ा।"
  ],
  "The Non-Cooperation Movement of 1920 to 1922 called for a boycott of": [
    "1920 का असहयोग: सरकारी स्कूल, अदालत और विदेशी कपड़ा छोड़ो। खादी पहनो।",
    "khadi and the Indian spinning wheel खादी और चरखा बहिष्कार में नहीं, बढ़ावा में थे।"
  ],
  "Gandhi called off the Non-Cooperation Movement after": [
    "चौरी चौरा में हिंसा हुई, गांधी ने असहयोग रोक दिया। साल 1922।",
    "the Battle of Plassey पलासी 1757 की लड़ाई है, असहयोग रोकने का कारण नहीं।"
  ],
  "The Salt March began on": [
    "नमक यात्रा 12 मार्च 1930। साबरमती से दांडी। तीस में नमक।",
    "10 May 1857 10 मई 1857 मेरठ का विद्रोह है।"
  ],
  "At Dandi, Gandhi broke the salt law. That law had": [
    "नमक कानून घर पर नमक बनाने से रोकता था। कर वाला नमक खरीदना पड़ता था।",
    "given salt free to every household, with no control हर घर को मुफ्त नमक, बिना रोक, यह कानून नहीं था।"
  ],
  "The Quit India Movement was launched in": [
    "भारत छोड़ो अगस्त 1942। बयालीस में भागो। नारा करो या मरो।",
    "May 1857 मई 1857 विद्रोह की शुरुआत है।"
  ],
  "Gandhi's call to the country in Quit India was": [
    "भारत छोड़ो का नारा करो या मरो। अंग्रेज़ जाएँ, तब तक लड़ो।",
    "sulh-i-kul सुलह-ए-कुल अकबर की शांति है, गांधी का नारा नहीं।"
  ],
  "The Muslim League's major political demand in the 1940s was": [
    "1940 के दशक में मुस्लिम लीग की बड़ी माँग अलग राज्य पाकिस्तान थी।",
    "the charter of 1600 1600 का चार्टर कंपनी का है, लीग की माँग नहीं।"
  ],
  "The Cabinet Mission of 1946 came to India to": [
    "1946 का कैबिनेट मिशन सत्ता कैसे सौंपी जाए, यही बात करने आया।",
    "fight the Battle of Buxar बक्सर 1764 की लड़ाई है, कैबिनेट मिशन नहीं।"
  ],
  "India became independent on": [
    "आज़ादी 15 अगस्त 1947। संविधान लागू 26 जनवरी 1950। तारीखें बदलो मत।",
    "26 January 1950 26 जनवरी 1950 गणतंत्र दिवस है, आज़ादी नहीं।"
  ],
  "Subhas Chandra Bose is remembered in the freedom struggle for": [
    "सुभाष चंद्र बोस आज़ाद हिंद फौज, इंडियन नेशनल आर्मी, के नेता थे।",
    "ordering the firing at Jallianwala Bagh जलियाँवाला पर गोलियाँ जनरल डायर ने चलवाईं।"
  ],
  "The Viceroy associated with the partition of Bengal in 1905 is": [
    "1905 में बंगाल बाँटने वाले वायसराय लॉर्ड कर्जन थे।",
    "Lord Canning लॉर्ड कैनिंग 1857-58 के वायसराय हैं।"
  ],
  "Chauri Chaura changed the course of Non-Cooperation because": [
    "चौरी चौरा में भीड़ ने थाना जलाया। गांधी हिंसा की अगुआई नहीं करते थे।",
    "the crowd handed in a polite petition, which he thought too mild to continue नरम अर्जी से नहीं रुका।"
  ],
  "The breakdown of plans such as the Cabinet Mission mattered because": [
    "कांग्रेस और लीग एक साझी योजना पर न टिके, 1947 में बँटवारा आया।",
    "the talks restored the Mughal Empire under Babur बातचीत ने बाबर का मुगल साम्राज्य वापस नहीं किया।"
  ],
  "Harappa and Mohenjo-daro were important cities of": [
    "हड़प्पा और मोहनजोदड़ो सिंधु घाटी के शहर थे।",
    "the British Raj after 1858 1858 के बाद का ब्रिटिश राज हजारों साल बाद है।"
  ],
  "The Great Bath of that civilisation has been found at": [
    "विशाल स्नानागार मोहनजोदड़ो में मिला। लाल किला मुगलों का है।",
    "the Red Fort in Delhi दिल्ली का लाल किला मुगल किला है, हड़प्पा का तालाब नहीं।"
  ],
  "A striking feature of Harappa and Mohenjo-daro was": [
    "हड़प्पा और मोहनजोदड़ो में सीधी सड़कें और ढकी नालियाँ थीं। पक्की ईंटें भी।",
    "a total absence of bricks and of any streets ईंट और सड़क का बिलकुल न होना खुदाई का उल्टा है।"
  ],
  "The suffering caused by the Kalinga war led Ashoka to": [
    "कलिंग की तबाही के बाद अशोक धम्म की ओर मुड़ा।",
    "fight a fresh war of conquest every year हर साल नई विजय-लड़ाई धम्म का रास्ता नहीं।"
  ],
  "Ashoka spread his messages mainly by": [
    "अशोक के संदेश चट्टानों और स्तंभों पर खुदे आदेश थे।",
    "printing them in daily newspapers रोज़ के अखबार तब छपते नहीं थे।"
  ],
  "Ashoka's dhamma taught people to": [
    "धम्म सिखाता था: एक-दूसरे का सम्मान, हिंसा से दूर, और सहनशीलता।",
    "practise untouchability छुआछूत धम्म नहीं। अनुच्छेद 17 उसे मिटाता है।"
  ],
  "The Gupta period is often called": [
    "गुप्त काल को कला और विद्या का शास्त्रीय युग कहते हैं।",
    "the same period as the revolt of 1857 1857 का विद्रोह गुप्त काल नहीं है।"
  ],
  "Which statement about these lines of latitude is correct?": [
    "भूमध्य रेखा 0°, कर्क 23.5° उत्तर, मकर 23.5° दक्षिण। उत्तर वाला कर्क है।",
    "The equator is 23.5°N, the Tropic of Cancer is 0°, and the Tropic of Capricorn is 23.5°S भूमध्य रेखा 0° है, 23.5° उत्तर नहीं।"
  ],
  "Which of these lines of latitude passes through India?": [
    "भारत के बीच से कर्क रेखा गुज़रती है। भूमध्य रेखा नहीं।",
    "The equator, through the middle of the country देश के बीचोंबीच भूमध्य रेखा नहीं जाती।"
  ],
  "Democracy means": [
    "लोकतंत्र यानी लोगों का राज। वोट से चुनकर शासन।",
    "rule by one king who answers to nobody किसी को जवाब न देने वाला राजा लोकतंत्र नहीं।"
  ],
  "A scale on a map shows": [
    "पैमाना बताता है नक्शे की दूरी ज़मीन की दूरी से कैसे मिलती है।",
    "only the colour chosen for the oceans समुद्र का रंग पैमाना नहीं, सिर्फ रंग है।"
  ],
  "The three levels of government in India are": [
    "भारत में तीन सरकारें: स्थानीय, राज्य और संघ।",
    "the army, the navy, and the air force थल, जल और वायु सेना सरकार के तीन स्तर नहीं।"
  ],
  "The gram sabha of a village is": [
    "ग्राम सभा गाँव के वयस्क मतदाताओं की संस्था है। पंचायत चुनी हुई परिषद है।",
    "the Supreme Court of India सुप्रीम कोर्ट गाँव की सभा नहीं है।"
  ],
  "Diversity in a country such as India means that": [
    "विविधता: भाषा, धर्म, खाना और रीति अलग, देश एक।",
    "everyone must follow one custom and speak only one language एक रीति और एक ही भाषा की ज़बरदस्ती विविधता मिटाती है।"
  ],
  "Discrimination means": [
    "भेदभाव यानी जाति, धर्म, लिंग या गरीबी के कारण अन्याय।",
    "giving every person the equal protection of the law कानून की बराबर सुरक्षा भेदभाव नहीं, उसका उल्टा है।"
  ],
  "A stereotype is": [
    "रूढ़ि एक जड़ा हुआ खयाल है कि समूह का हर सदस्य एक जैसा है।",
    "a careful judgment made after knowing a person किसी को जानकर सावधानी से परखना रूढ़ि नहीं।"
  ],
  "A weekly haat is": [
    "साप्ताहिक हाट तय दिन का बाज़ार है, अस्थायी ठेलों वाला।",
    "a multi-storey building of permanent branded shops पक्की ब्रांडेड दुकानों की बहुमंजिला इमारत शॉपिंग कॉम्प्लेक्स है।"
  ],
  "A shopping complex usually has": [
    "शॉपिंग कॉम्प्लेक्स में पक्की दुकानें ब्रांडेड माल महँगे दाम पर बेचती हैं।",
    "only temporary stalls set up for one morning in a village गाँव में एक सुबह के अस्थायी ठेले हाट हैं।"
  ],
  "Which list of early Mughal rulers is in the correct order?": [
    "पहले बाबर, फिर हुमायूँ, फिर अकबर। बाप, बेटा, पोता जैसा सिलसिला।",
    "Akbar, Babur, Humayun अकबर, बाबर, हुमायूँ क्रम को उलट देता है।"
  ],
  "Which list of later Mughal rulers is in the correct order?": [
    "जहाँगीर, फिर शाहजहाँ, फिर औरंगज़ेब। आखिरी औरंगज़ेब।",
    "Aurangzeb, Jahangir, Shah Jahan औरंगज़ेब को सबसे आगे रखना क्रम उलट देता है।"
  ],
  "Babur laid the foundation of Mughal power in India when he": [
    "बाबर ने 1526 में पानीपत पर इब्राहीम लोदी को हराया। मुगल सत्ता की नींव।",
    "defeated the British at Plassey in 1757 1757 की पलासी क्लाइव की जीत है, बाबर की नहीं।"
  ],
  "Akbar's policy of sulh-i-kul means": [
    "अकबर की सुलह-ए-कुल यानी सबके साथ शांति, धर्मों में सहनशीलता।",
    "the Doctrine of Lapse व्यपगत का सिद्धांत डलहौज़ी का है, अकबर का नहीं।"
  ],
  "Day and night are caused by": [
    "दिन-रात धरती के अपनी धुरी पर घूमने से होते हैं। सूरज का चक्कर साल बनाता है।",
    "the Earth revolving once around the Sun सूर्य की एक परिक्रमा साल बनाती है, दिन-रात नहीं।"
  ],
  "Shah Jahan is especially remembered for building": [
    "शाहजहाँ ताज महल के लिए याद किया जाता है। आगरा, मुमताज़ की याद।",
    "the Great Bath at Mohenjo-daro मोहनजोदड़ो का विशाल स्नानागार शाहजहाँ का नहीं।"
  ]
};

function row(stem, correct, w1, w2, w3, cWhy, a, b, c) {
  let explanation = `The correct choice is ${correct} because ${cWhy} ${w1} is wrong because ${a} ${w2} is wrong because ${b} ${w3} is wrong because ${c}`;
  const trick = memoryTricks[stem];
  if (trick) {
    explanation += "\nयाद रखो: " + trick[0] + "\nगलत मत याद करना: " + trick[1];
  }
  if (explanation.length < 160) {
    throw new Error(`Short explanation (${explanation.length}) for: ${stem}`);
  }
  for (const opt of [correct, w1, w2, w3]) {
    if (!explanation.includes(opt)) {
      throw new Error(`Explanation misses [${opt}] for: ${stem}`);
    }
  }
  return [stem, correct, w1, w2, w3, explanation];
}

function topic(id, title, ncert, concept, rows) {
  const words = concept.trim().split(/\s+/).length;
  if (words < 80 || words > 130) {
    throw new Error(`${id} concept has ${words} words`);
  }
  if (rows.length !== 24) {
    throw new Error(`${id} has ${rows.length} questions`);
  }
  return {
    id,
    subject: "sst",
    title,
    ncert,
    minutes: 18,
    testSize: 12,
    concept,
    questions: fromRows(id, rows),
  };
}

const resources = topic(
  "t-resources",
  "Resources",
  "NCERT Class 8 Geography Chapter 1: Resources",
  "A resource is anything that can satisfy a human need. What makes it a resource is utility, or usefulness, not only a price tag. People obtain a patent when they want the exclusive right to an invention. Resources are natural, human-made, or human. Air, water, soil, and minerals are natural. Bridges, roads, and machines are human-made. Human resources are people, together with their health, education, and skill. Renewable resources, such as sunshine and wind, can be renewed, though even water and forests can run short if they are misused. Coal and petroleum are non-renewable because their stock is limited. Sustainable development means meeting today's needs without robbing future generations.",
  [
    row(
      "What makes a thing a resource?",
      "Its utility, because people can use it to meet a need",
      "Only a high market price, even if nobody can use it",
      "The colour of the substance alone",
      "The fact that it has no use at all",
      "utility means the thing can satisfy a need, and that usefulness is what makes it a resource.",
      "a price is not required. A beautiful landscape can be a resource even when it is not for sale.",
      "colour by itself does not satisfy a need, so a colour is not the test of a resource.",
      "a thing with no use has no utility, so it is not a resource.",
    ),
    row(
      "A free and beautiful waterfall can still be a resource because",
      "it has utility for people even without a price tag",
      "only goods with a printed price are resources",
      "a waterfall is a patent",
      "beauty cancels usefulness",
      "the waterfall is useful and enjoyable, so it has utility and counts as a resource.",
      "the textbook idea is that value can exist without a market price.",
      "a patent is an exclusive right over an invention, not a natural waterfall.",
      "beauty is part of its usefulness here, and it does not cancel utility.",
    ),
    row(
      "A patent gives a person",
      "the exclusive right over an invention",
      "the ownership of all rainfall in a state",
      "a licence to waste any mineral",
      "the power to rename a river",
      "a patent is the exclusive right to make, use, or sell an invention.",
      "rainfall is a natural resource and is not granted by a patent.",
      "a patent protects an idea; it is not permission to waste minerals.",
      "renaming a river is not what a patent does.",
    ),
    row(
      "Which of these is a natural resource?",
      "Air",
      "A concrete bridge",
      "A laptop computer",
      "A paved highway",
      "air is found in nature and is used with little modification, so it is natural.",
      "a concrete bridge is built by people, so it is human-made.",
      "a laptop is manufactured, so it is human-made.",
      "a paved highway is built by people, so it is human-made.",
    ),
    row(
      "Which of these is a human-made resource?",
      "A railway bridge",
      "Sunlight",
      "Iron ore still lying in the ground",
      "The wind",
      "a railway bridge is built by using technology and materials, so it is human-made.",
      "sunlight is a gift of nature, not something people manufacture.",
      "iron ore in the ground is a natural resource until people process it.",
      "wind is a natural resource.",
    ),
    row(
      "Which of these is a human resource?",
      "A trained teacher's knowledge and skill",
      "A seam of coal",
      "A factory building",
      "A river",
      "human resources are people and their abilities. A trained teacher's skill is a human resource.",
      "a seam of coal is a natural mineral resource.",
      "a factory building is human-made, but it is not the people themselves.",
      "a river is a natural resource.",
    ),
    row(
      "Which energy source is renewable?",
      "Wind",
      "Coal",
      "Petroleum",
      "A mineral that cannot be replaced once it is mined out",
      "wind keeps flowing and can be used again, so wind energy is renewable.",
      "coal is a fossil fuel with a limited stock, so it is non-renewable.",
      "petroleum is also a limited fossil fuel.",
      "a mineral that cannot be replaced is non-renewable by definition.",
    ),
    row(
      "Which statement about water is correct?",
      "Water is renewable, yet it can run short if people waste or pollute it",
      "Water can never become scarce in any region",
      "Water is non-renewable in the same way as coal",
      "Water is a human-made resource",
      "the water cycle renews water, but careless use and pollution can still leave people short of it.",
      "many places already face water scarcity, so it is false that water can never run short.",
      "coal does not renew on a human time scale, whereas water is classed as renewable.",
      "water occurs in nature, so it is not human-made.",
    ),
    row(
      "Which example shows technology turning nature into a usable resource?",
      "Using the flow of a river to generate electricity",
      "Giving a mountain a new name and doing nothing else",
      "Hiding a mineral so that nobody can reach it",
      "Refusing to use sunshine for any purpose",
      "technology lets people turn moving water into electricity, so the river's energy becomes a resource in a new way.",
      "a new name does not create utility.",
      "hiding a mineral prevents use, so it does not make the mineral available.",
      "refusing sunshine leaves that energy unused.",
    ),
    row(
      "People are called a special resource because",
      "they discover uses and turn other things into resources",
      "they are a kind of coal",
      "they cannot learn new skills",
      "they remove the need for every natural resource",
      "human beings apply knowledge and make natural things useful, so they are a special resource.",
      "people are not a mineral fuel.",
      "people can learn, and education is how the quality of this resource improves.",
      "people still depend on land, water, and other natural resources.",
    ),
    row(
      "Sustainable development means",
      "meeting present needs without destroying the ability of future generations to meet theirs",
      "using up every mineral as fast as possible",
      "saving resources for a few people and denying them to everyone else",
      "stopping all use of resources forever, including food and water",
      "the standard meaning is careful use that serves people now and also leaves enough for the future.",
      "using every mineral at full speed is the opposite of conservation.",
      "sustainable development is about fairness across time, not about hoarding by a few.",
      "people must use resources to live. The aim is careful use, not a total stop.",
    ),
    row(
      "Why is careful use of minerals important?",
      "Minerals have a limited stock and are non-renewable",
      "Minerals grow back after every monsoon",
      "Minerals are as evenly present as air in every breath",
      "Minerals are human resources",
      "minerals form very slowly and the quantity in the earth is limited, so waste is hard to replace.",
      "minerals do not regrow with the rains the way a crop might.",
      "air is widespread, but many minerals are found only in particular places.",
      "minerals are natural resources, not the skills of people.",
    ),
    row(
      "Which action conserves a non-renewable metal?",
      "Recycling aluminium instead of throwing it away",
      "Dumping metal scrap in a river",
      "Mining ore and never reusing the metal",
      "Burning aluminium cans as if they were firewood",
      "recycling lets the same metal be used again, which slows the drain on a limited stock.",
      "dumping scrap pollutes water and loses the metal.",
      "never reusing the metal forces more mining of a limited resource.",
      "aluminium is not a fuel, and burning cans wastes the metal.",
    ),
    row(
      "What improves the quality of a country's human resources?",
      "Education and health care",
      "Closing schools",
      "Ignoring illness and skill",
      "Treating knowledge as useless",
      "healthy, educated, and skilled people can do more, so education and health raise the quality of human resources.",
      "closing schools reduces learning and lowers that quality.",
      "ignoring illness and skill leaves people's abilities undeveloped.",
      "knowledge is exactly what makes human resources more valuable.",
    ),
    row(
      "Petroleum is non-renewable because",
      "it forms over a vast span of time and the usable stock is limited",
      "new petroleum is produced in every rainy season",
      "petroleum is manufactured in kitchens",
      "sunlight turns into fresh petroleum every afternoon",
      "petroleum is a fossil fuel. Nature does not replace the amount people burn within a human lifetime.",
      "the rainy season does not refill oil fields.",
      "petroleum is extracted from the earth, not cooked in a kitchen.",
      "sunlight is renewable, but it does not create a new tank of petroleum each day.",
    ),
    row(
      "Which of these is renewable?",
      "Sunlight",
      "Coal",
      "Petroleum",
      "Natural gas",
      "sunlight arrives every day and is a renewable energy source.",
      "coal is a fossil fuel with a limited stock.",
      "petroleum is a limited fossil fuel.",
      "natural gas is also a fossil fuel and is non-renewable.",
    ),
    row(
      "Which group contains only human-made resources?",
      "Bridges, machines, and roads",
      "Air, coal, and soil",
      "Sunlight, wind, and rain",
      "Forests, wildlife, and fish",
      "bridges, machines, and roads are all built by people.",
      "air, coal, and soil occur in nature.",
      "sunlight, wind, and rain are natural.",
      "forests, wildlife, and fish are natural, even though people may use them.",
    ),
    row(
      "Which practice matches sustainable development?",
      "Replanting trees after cutting and using groundwater carefully",
      "Clearing a forest and never replanting it",
      "Pumping a well dry with no recharge",
      "Pouring untreated factory waste into a river",
      "replanting and careful water use meet present needs while keeping resources for later.",
      "clearing a forest with no replanting destroys a resource for the future.",
      "emptying a well with no recharge creates scarcity.",
      "untreated waste pollutes water and harms both present and future users.",
    ),
    row(
      "Which statement about the spread of resources is correct?",
      "Resources are distributed unevenly over the earth",
      "Every district has the same minerals",
      "Every country has the same amount of petroleum",
      "A large area always has every resource people need",
      "minerals, water, and fertile soil are not shared out equally, which is why places differ.",
      "mineral deposits are localised, so districts do not all have the same ones.",
      "petroleum is concentrated in some regions and absent in many others.",
      "size alone does not guarantee coal, oil, or fertile soil.",
    ),
    row(
      "A substance in nature becomes a resource when",
      "people find a use for it",
      "it is buried so deep that nobody can reach it",
      "nobody knows that it exists",
      "it has no utility",
      "use, or utility, is the change that turns a natural substance into a resource.",
      "if nobody can reach it, it stays unused and is not yet an actual resource in practice.",
      "an unknown substance is not being used to meet a need.",
      "no utility means it does not satisfy a need.",
    ),
    row(
      "Which description of forests is accurate?",
      "They can regrow, but overcutting can still destroy them",
      "They are impossible to harm",
      "They form again overnight like a manufactured tool",
      "They are human-made resources",
      "forests are renewable only if growth is allowed to continue. Reckless cutting can wipe them out.",
      "forests are damaged by clearing, fire, and overuse, so they are not impossible to harm.",
      "a forest does not regrow overnight the way a factory might make a tool.",
      "forests grow in nature, so they are natural resources.",
    ),
    row(
      "Which is a human resource rather than a human-made object?",
      "The skill of a weaver",
      "The loom in the workshop",
      "The finished cloth",
      "The workshop building",
      "the weaver's skill is a human ability, so it is a human resource.",
      "the loom is a machine that people made.",
      "the finished cloth is a product, not the person.",
      "the workshop building is human-made.",
    ),
    row(
      "Which pair helps to explain how resources become available?",
      "Time and technology",
      "Colour and luck alone",
      "Noise and darkness",
      "A patent on rainfall",
      "over time, and with technology, people learn to use things that earlier generations could not use.",
      "colour and luck are not the textbook explanation of how substances become resources.",
      "noise and darkness do not create utility.",
      "rainfall is not something a patent assigns to one inventor.",
    ),
    row(
      "Which person is using a resource sustainably?",
      "A farmer who saves seed, guards the soil, and limits waste of water",
      "A miner who extracts ore with no plan to reuse or restore anything",
      "A household that burns plastic in the open every evening",
      "A factory that dumps dye into the only village stream",
      "saving seed, protecting soil, and limiting water waste keeps the farm productive for later years.",
      "extraction with no reuse or restoration drains a limited stock and damages the site.",
      "burning plastic pollutes the air and wastes material that might have been reused.",
      "dumping dye destroys a shared water resource.",
    ),
  ],
);

const land = topic(
  "t-land",
  "Land, Soil, Water, Natural Vegetation and Wildlife",
  "NCERT Class 8 Geography Chapter 2: Land, Soil, Water, Natural Vegetation and Wildlife Resources",
  "Only about 30 per cent of the earth's surface is land, and people use it for farms, forests, pasture, homes, and roads. Plains and river valleys are crowded because the soil and water suit farming. Soil forms slowly from the parent rock, with help from climate, relief, living things, and time. Humus from decayed plants and animals makes the topsoil fertile. Deforestation, overgrazing, and careless chemicals degrade land. Mulching covers bare soil so moisture stays. Terrace farming cuts steps into a slope. Contour ploughing follows the slope's level lines. Shelter belts are rows of trees that check the wind. Fresh water is scarce, so rainwater harvesting and careful irrigation matter. Vegetation and wildlife depend on climate, and parks and laws such as CITES help protect them.",
  [
    row(
      "About how much of the earth's surface is land?",
      "About 30 per cent",
      "About 70 per cent",
      "About 90 per cent",
      "About 5 per cent",
      "land covers roughly 30 per cent of the surface, and water covers most of the rest.",
      "about 70 per cent is the share usually given to water, not to land.",
      "90 per cent would leave almost no ocean, which is not the shape of the earth.",
      "5 per cent is far too small for the continents and islands.",
    ),
    row(
      "Why are many river plains densely populated?",
      "The soil and water suit farming and settlement",
      "The soil is frozen for most of the year",
      "Plains have no rivers",
      "Farming is impossible on flat land",
      "flat fertile land and available water make farming easier, so more people live there.",
      "frozen soil is a feature of very cold regions, not of typical river plains.",
      "a river plain is named for its river, so it is false that plains have no rivers.",
      "flat land is often the easiest land to farm, not impossible land.",
    ),
    row(
      "Which is a factor in the formation of soil?",
      "The parent rock",
      "The market price of wheat",
      "A patent on an invention",
      "The title of a history book",
      "soil begins as the parent rock breaks down, so the rock is a basic factor.",
      "the price of wheat is an economic fact and does not form soil.",
      "a patent protects an invention and has nothing to do with soil formation.",
      "a book title does not break rock into soil.",
    ),
    row(
      "Which of these also affects soil formation?",
      "Climate",
      "The colour of a national flag",
      "The number of post offices",
      "The name of a railway station",
      "temperature and rainfall, which are parts of climate, change how fast rock breaks and how much organic matter collects.",
      "a flag's colour does not weather rock.",
      "post offices do not form soil.",
      "a station name does not change the parent rock or the climate.",
    ),
    row(
      "Why does bare rock not become deep soil overnight?",
      "Soil formation takes a long time",
      "Machines spread finished soil on every rock each night",
      "Parent rock becomes humus in a single day",
      "One shower completes the whole process",
      "weathering, plants, and decay work slowly, so time is an essential factor.",
      "soil is not delivered nightly by machines.",
      "humus comes from decayed living matter, and rock does not turn into it in a day.",
      "one shower may wet the rock, but it does not finish soil formation.",
    ),
    row(
      "Humus is",
      "decayed plant and animal matter that helps make topsoil fertile",
      "a solid layer of unused metal",
      "fresh sand with no organic matter",
      "ice stored in a glacier",
      "humus is the dark organic material from decay, and it enriches the topsoil.",
      "metal is not humus.",
      "sand without organic matter is not humus.",
      "glacier ice is frozen water, not decayed living matter.",
    ),
    row(
      "Which action can degrade land?",
      "Cutting a forest and leaving the slope bare",
      "Mulching a field",
      "Planting a shelter belt",
      "Ploughing along the contour",
      "bare slopes lose soil easily after trees are removed, so this is land degradation.",
      "mulching protects moisture and the soil surface.",
      "a shelter belt checks wind and protects the soil.",
      "contour ploughing slows water running down a slope.",
    ),
    row(
      "Overgrazing harms land because",
      "too many animals strip the plants that hold the soil",
      "animals always build terraces",
      "grazing is another name for mulching",
      "grazing plants a shelter belt by itself",
      "when plant cover is eaten away, wind and water can remove the soil.",
      "animals do not construct terraces.",
      "mulching is a cover of straw or similar matter, not grazing.",
      "a shelter belt is a row of trees that people plant.",
    ),
    row(
      "Mulching means",
      "covering bare ground with organic matter such as straw to keep moisture in",
      "cutting flat steps into a steep hill",
      "ploughing straight down the steepest line",
      "emptying a lake to grow wheat on the bed",
      "the organic cover shades the soil and reduces evaporation, which is mulching.",
      "flat steps on a hill are terrace farming.",
      "ploughing down the steepest line increases erosion and is not mulching.",
      "draining a lake is not the method called mulching.",
    ),
    row(
      "Terrace farming is used to",
      "make flat steps on a slope so water does not rush straight downhill",
      "cover the soil with a layer of straw",
      "plant trees only to decorate a city park",
      "pump seawater onto the fields",
      "terraces slow runoff and give flatter surfaces for crops on a slope.",
      "a straw cover is mulching, not terracing.",
      "decoration is not the purpose of terrace farming.",
      "seawater would harm crops and is not terrace farming.",
    ),
    row(
      "A shelter belt is",
      "a row of trees planted to check the wind and protect the soil",
      "a belt worn while ploughing",
      "a dam built across a delta",
      "a deep mine shaft",
      "rows of trees break the force of the wind, which is why they are called shelter belts.",
      "clothing is not a soil-conservation method.",
      "a dam is a water structure, not a belt of trees.",
      "a mine shaft extracts minerals and does not shelter soil from wind.",
    ),
    row(
      "Contour ploughing means",
      "ploughing along the level lines of a hill so water slows down",
      "ploughing straight up and down the steepest slope",
      "leaving the field unploughed for good",
      "ploughing only after the soil has already been washed away",
      "furrows along the contour act as barriers, so water does not race straight down the slope.",
      "up-and-down ploughing gives water a fast path and increases erosion.",
      "never ploughing is not the definition of contour ploughing.",
      "the method is meant to prevent the soil from being washed away.",
    ),
    row(
      "Most of the water on earth is",
      "salty ocean water that people cannot drink as it is",
      "fresh water stored in village wells",
      "water kept in kitchen pots",
      "rain falling on one city in one hour",
      "oceans hold most of the water, and that water is saline.",
      "wells hold only a tiny local share of fresh water.",
      "kitchen pots are not the earth's water store.",
      "one hour of rain over one city is a minute fraction of the earth's water.",
    ),
    row(
      "Which combination can cause water scarcity?",
      "Rising demand, wastage, and pollution",
      "Careful drip irrigation by itself",
      "Harvesting roof rain and using it wisely",
      "A single unused well in a very rainy forest",
      "more users, wasted water, and dirty sources together leave less usable water.",
      "drip irrigation is a way to save water, not a cause of scarcity.",
      "wise harvesting increases the supply people can use.",
      "one unused well in a rainy forest does not describe scarcity.",
    ),
    row(
      "Rainwater harvesting means",
      "collecting and storing rain so it can be used later",
      "sending every drop straight to the sea",
      "covering fields so that no rain can touch the soil",
      "replacing rain with seawater",
      "harvesting rain means catching and keeping it for drinking or farming.",
      "sending all rain to the sea wastes the fresh water.",
      "blocking rain from the soil is not harvesting.",
      "seawater is salty and is not harvested rain.",
    ),
    row(
      "Natural vegetation in a place depends mainly on",
      "temperature and rainfall",
      "the official language",
      "the date of a festival",
      "the number of television channels",
      "plants grow according to heat and moisture, so climate decides the vegetation.",
      "language does not decide which plants can grow.",
      "a festival date does not set the climate.",
      "television channels do not determine natural vegetation.",
    ),
    row(
      "A wildlife sanctuary is meant to",
      "protect wild animals and the habitat they need",
      "replace every forest with a city",
      "allow free trade in rare animals",
      "open the whole area to mining first",
      "a sanctuary is a protected area where wildlife and its home are conserved.",
      "replacing the forest removes the habitat.",
      "free trade in rare animals is what protection tries to stop.",
      "mining first would destroy the habitat the sanctuary is meant to guard.",
    ),
    row(
      "CITES is important because it",
      "restricts international trade in endangered wild plants and animals",
      "is a method of contour ploughing",
      "is a type of desert soil",
      "is a beverage crop grown on hills",
      "CITES is the Convention on International Trade in Endangered Species, and it limits trade that threatens rare wildlife.",
      "contour ploughing is a farming method, not a wildlife treaty.",
      "CITES is not a soil type.",
      "a beverage crop such as tea is not a conservation treaty.",
    ),
    row(
      "Careless use of chemical fertilisers can",
      "harm the soil over time",
      "remove the need for parent rock in soil formation",
      "turn a desert into a glacier in one night",
      "plant a shelter belt without trees",
      "too many chemicals can damage soil life and structure, which is a form of degradation.",
      "parent rock remains a natural factor, and fertiliser does not replace it.",
      "fertiliser cannot turn a desert into a glacier overnight.",
      "a shelter belt needs trees, not a bag of fertiliser.",
    ),
    row(
      "Which list is made up of land uses?",
      "Farms, forests, pastures, and settlements",
      "Patents, poems, and prices",
      "Only lines of latitude",
      "Only ocean currents",
      "people use land to grow crops, keep forests and pastures, and build places to live.",
      "patents, poems, and prices are not ways of using the land surface.",
      "latitude is a map line, not a use of land.",
      "ocean currents are movements of water, not land uses.",
    ),
    row(
      "Soil erosion means",
      "the removal of topsoil by wind or running water",
      "the adding of humus to a field",
      "the building of terraces",
      "the planting of a shelter belt",
      "erosion carries away the fertile top layer.",
      "adding humus improves soil; it is not erosion.",
      "terraces are built to reduce erosion.",
      "a shelter belt is planted to protect soil from wind.",
    ),
    row(
      "Community land is best described as",
      "land kept for common village use rather than seized by one person",
      "land with no rules of any kind",
      "the private courtyard of one factory owner only",
      "the floor of the deep ocean",
      "community or common land serves the village, and encroachment takes that shared resource away.",
      "common land still needs care and rules so that everyone can use it fairly.",
      "one factory courtyard is private, not community land.",
      "the ocean floor is not the village common.",
    ),
    row(
      "Drip irrigation saves water because",
      "it releases water slowly near the roots instead of flooding the field",
      "it floods the field every hour",
      "it uses only seawater",
      "it stops clouds from forming",
      "slow delivery at the roots cuts waste from runoff and evaporation.",
      "hourly flooding wastes water.",
      "seawater is salty and is not the idea of drip irrigation.",
      "irrigation does not control cloud formation.",
    ),
    row(
      "Intercropping helps the soil because",
      "different crops grown in alternate rows give the soil better cover",
      "the land is left completely bare between the rows",
      "only one mining trench is dug between the crops",
      "all plants are removed before every rain",
      "alternate rows of different crops protect the soil from rain wash better than a bare surface.",
      "bare soil between rows would increase erosion, which intercropping tries to avoid.",
      "a mining trench is not intercropping.",
      "removing all plants before rain would expose the soil.",
    ),
  ],
);

const agriculture = topic(
  "t-agriculture",
  "Agriculture",
  "NCERT Class 8 Geography Chapter 3: Agriculture",
  "Subsistence farming feeds the farmer's own family. Intensive subsistence farming uses a small plot and much labour, and rice is often the main crop. Shifting cultivation, called jhum in north-east India, clears a patch and then moves on. Commercial farming grows crops for sale. A plantation is a large estate of one main crop, such as tea, coffee, or rubber. Rice needs high heat, humidity, and rainfall. Wheat prefers a cool season and moderate rain, and in India it is a winter crop. Millets tolerate poorer soil and less rain. Jute is the golden fibre. Cotton needs heat, light rain, and a long frost-free period. Brazil is a major coffee grower. Tea needs frequent showers on well-drained hills.",
  [
    row(
      "Subsistence farming mainly aims to",
      "feed the farmer's own family",
      "supply a foreign factory with one plantation crop",
      "sell the entire harvest in a distant market",
      "run a large machine-based grain estate",
      "subsistence farming is production for the family's needs rather than for large-scale sale.",
      "a single crop for a factory is the plantation pattern.",
      "selling the whole harvest is commercial farming.",
      "a large mechanised grain estate is commercial grain farming.",
    ),
    row(
      "Intensive subsistence farming usually has",
      "a small plot, much labour, and often more than one crop a year",
      "a huge farm run by a few workers and large machines",
      "animals moving across a desert with no cultivation",
      "one tea estate owned by a company",
      "in crowded monsoon regions the family works a small piece of land hard and may take more than one crop.",
      "huge farms and few workers describe commercial grain farming.",
      "moving with animals is nomadic herding, not intensive cultivation.",
      "a company tea estate is a plantation.",
    ),
    row(
      "In north-east India, shifting cultivation is called",
      "jhum",
      "milpa",
      "roca",
      "ladang",
      "jhum is the name used in north-east India for clearing a plot, farming it, and then moving.",
      "milpa is a name used in Mexico.",
      "roca is a name used in Brazil.",
      "ladang is a name used in Malaysia and Indonesia.",
    ),
    row(
      "Commercial farming means that crops are grown mainly",
      "for sale in the market",
      "only to be eaten by the farmer's family",
      "to be abandoned after one week",
      "without any soil or water",
      "the defining point of commercial farming is production for sale.",
      "eating the crop at home is subsistence farming.",
      "abandoning the crop is not a type of farming.",
      "crops cannot be grown with no soil and no water.",
    ),
    row(
      "A plantation is best described as",
      "a large estate growing one main crop with large inputs of labour and capital",
      "a tiny family plot of many mixed vegetables for home use",
      "a herd moving in search of grass",
      "a field of wheat on a temperate grassland farmed with machines as a grain crop",
      "tea, coffee, rubber, and similar crops are grown this way, often for processing.",
      "a tiny mixed plot for home use is intensive subsistence, not a plantation.",
      "a moving herd is nomadic herding.",
      "machine-grown wheat on temperate grassland is commercial grain farming, not the plantation type.",
    ),
    row(
      "Rice grows best where there is",
      "high temperature, high humidity, and plenty of rainfall",
      "a cool winter and only moderate rain",
      "almost no water and sandy desert soil",
      "continuous frost",
      "rice is a crop of hot, wet, humid conditions, and it likes soil that can hold water.",
      "a cool season and moderate rain suit wheat, not rice.",
      "desert dryness does not meet rice's need for water.",
      "frost would kill a tropical crop such as rice.",
    ),
    row(
      "Which conditions suit wheat?",
      "A cool growing season, moderate rainfall, and bright sunshine at harvest",
      "Standing water and very heavy equatorial rain all year",
      "Flooded delta soil of the kind jute prefers",
      "No sunshine at any stage",
      "wheat likes moderate moisture and a cool season, with bright sun when the grain ripens.",
      "standing water and year-round heavy rain suit rice more than wheat.",
      "jute wants high heat, heavy rain, and alluvial soil, which is not the wheat pattern.",
      "wheat needs bright sunshine at harvest, so no sunshine is wrong.",
    ),
    row(
      "Jowar, bajra, and ragi are",
      "millets that can grow with less rainfall and on less fertile soil",
      "plantation beverages",
      "types of ocean fish",
      "methods of terrace farming",
      "these coarse grains are hardy millets and do not demand the richest soil or the heaviest rain.",
      "tea and coffee are plantation beverages, not these grains.",
      "they are crops, not fish.",
      "terrace farming is a way of shaping a slope, not a grain.",
    ),
    row(
      "Jute is called the golden fibre because",
      "that is the traditional name of this fibre crop",
      "it is a precious metal mined from hills",
      "it is a variety of wheat",
      "it grows only on snow",
      "jute is the fibre known as the golden fibre. It needs heat, heavy rain, and alluvial soil.",
      "jute is a plant fibre, not a metal.",
      "wheat is a food grain, not jute.",
      "jute is a crop of warm, wet lowlands, not of snow.",
    ),
    row(
      "Which pair of countries are major jute producers?",
      "India and Bangladesh",
      "Norway and Iceland",
      "Egypt and Libya as the only producers",
      "Japan and Mongolia",
      "the warm, wet alluvial lands of India and Bangladesh are the classic major jute regions.",
      "Norway and Iceland are too cold for jute.",
      "the question does not claim Egypt and Libya are the only producers, and they are not the standard jute pair.",
      "Japan and Mongolia are not the textbook pair for jute.",
    ),
    row(
      "Cotton needs",
      "high temperature, light rainfall or irrigation, and a long frost-free period",
      "heavy rain and flooded fields like rice",
      "permanent snow",
      "no sunshine",
      "cotton wants heat, light rain or irrigation, sunshine, and about 210 frost-free days. Black soil of the Deccan is important in India.",
      "flooded fields suit rice, and cotton prefers lighter rainfall.",
      "snow and frost damage cotton.",
      "cotton needs bright sunshine.",
    ),
    row(
      "Which statement about coffee is reliable?",
      "Brazil is a major coffee-producing country, and coffee prefers a warm, wet climate on well-drained slopes",
      "Coffee is a millet grown in deserts",
      "Coffee needs standing water like paddy",
      "Coffee is another name for jute",
      "Brazil is a major producer, and the crop likes warmth, moisture, and slopes where water drains away.",
      "millets are coarse grains, and coffee is a beverage plantation crop.",
      "standing water would harm a crop that needs well-drained soil.",
      "jute is a fibre, not coffee.",
    ),
    row(
      "Tea is grown successfully where there are",
      "well-drained soils and frequent showers, often on hills in India and in Kenya",
      "frozen polar plains",
      "only deep desert sand and no rain",
      "flooded mangrove swamps as the ideal site",
      "frequent rain keeps tender tea leaves growing, and the water must drain. Hill regions of India and Kenya are important producers.",
      "polar cold does not suit tea.",
      "tea cannot thrive with no rain on deep desert sand.",
      "tea is not a swamp crop; it needs drainage.",
    ),
    row(
      "Maize grows well with",
      "moderate temperature, moderate rainfall, and plenty of sunshine",
      "continuous frost",
      "no soil",
      "total darkness",
      "maize likes a moderate climate, rainfall that is not extreme, sunshine, and well-drained fertile soil.",
      "frost is not the climate maize needs.",
      "a crop cannot grow with no soil.",
      "maize needs lots of sunshine, not darkness.",
    ),
    row(
      "Nomadic herding means that people",
      "move with their animals in search of fodder and water",
      "stay on one plantation of tea for generations without animals",
      "grow rice in standing water and never keep herds",
      "run a factory that makes steel",
      "herders shift from place to place so the animals can find grass and water.",
      "a tea plantation is settled cultivation, not nomadic herding.",
      "rice farming is cultivation, not herding.",
      "a steel factory is an industry, not herding.",
    ),
    row(
      "Rice is a staple food especially in",
      "the hot, wet monsoon regions of Asia",
      "the frozen interior of Greenland",
      "the driest cores of the Sahara only",
      "Antarctica",
      "rice feeds large populations in the tropical and subtropical monsoon lands.",
      "Greenland is too cold for rice.",
      "the driest Sahara cannot supply the water rice needs.",
      "Antarctica has no rice farming.",
    ),
    row(
      "In India, wheat is mainly a",
      "rabi, or winter, crop",
      "crop that must stand in deep water through the hottest monsoon",
      "shifting crop of the tundra",
      "kind of jute",
      "Indian wheat is sown in winter and harvested as a rabi crop.",
      "deep water in the hot monsoon describes rice, which is mainly kharif.",
      "the tundra is not an Indian wheat region, and wheat is not grown by shifting cultivation there.",
      "jute is a fibre, not wheat.",
    ),
    row(
      "Which crop is typically grown as a plantation crop?",
      "Tea",
      "Bajra",
      "Jowar",
      "Ragi",
      "tea is grown on plantations with large labour and capital inputs.",
      "bajra is a millet, usually a hardy food crop, not a plantation beverage.",
      "jowar is also a millet.",
      "ragi is a millet grown on less fertile and drier land.",
    ),
    row(
      "Shifting cultivation becomes more harmful when",
      "the fallow period becomes too short for the forest to recover",
      "the farmer never cuts any tree",
      "the same plot is left unused for a very long recovery",
      "no fire is ever used and the forest is untouched",
      "if people return before the vegetation and soil recover, the forest and the land degrade.",
      "never cutting a tree is not shifting cultivation.",
      "a long recovery is the older pattern that did less harm.",
      "an untouched forest is not this farming method.",
    ),
    row(
      "Commercial grain farming is associated with",
      "large farms, machines, and crops such as wheat in temperate grasslands",
      "a one-hectare family plot worked only with hand tools for home rice",
      "nomads crossing a desert with camels",
      "picking tea leaves by hand on a hill estate",
      "temperate grasslands support big wheat or maize farms that use machinery.",
      "a tiny family rice plot is intensive subsistence.",
      "camel nomads are herders, not grain farmers.",
      "hand-picked tea is plantation agriculture.",
    ),
    row(
      "Jute grows especially well in",
      "the alluvial lands of the Ganga-Brahmaputra delta",
      "the snowfields of the high Himalaya",
      "the polar tundra",
      "a rainless rocky plateau with no rivers",
      "jute wants alluvial soil, high temperature, and heavy rain, which the delta region provides.",
      "snowfields are too cold.",
      "the tundra is too cold and dry for jute.",
      "a rainless plateau cannot meet jute's need for heavy rainfall.",
    ),
    row(
      "Which of these is a fibre crop?",
      "Jute",
      "Rice",
      "Wheat",
      "Maize",
      "jute is grown for its fibre, the golden fibre.",
      "rice is a food grain.",
      "wheat is a food grain.",
      "maize is a food grain.",
    ),
    row(
      "Tea plantations need a large number of workers mainly because",
      "the tender leaves are picked by hand",
      "the bushes are harvested by one person with a single machine in an hour",
      "tea grows without any human care",
      "the crop is gathered from the ocean",
      "plucking the right leaves is careful hand work, so tea is labour intensive.",
      "tea is not harvested in one hour by one machine in the textbook account.",
      "plantations need labour for plucking and processing.",
      "tea is a land crop, not an ocean crop.",
    ),
    row(
      "Primitive subsistence farming includes",
      "shifting cultivation and nomadic herding",
      "only large wheat estates in the prairies",
      "only information-technology offices",
      "only iron and steel plants",
      "the simple, older subsistence forms in this chapter are shifting cultivation and nomadic herding.",
      "prairie wheat estates are commercial grain farms.",
      "offices are not farming.",
      "steel plants are industries.",
    ),
  ],
);

const industries = topic(
  "t-industries",
  "Industries",
  "NCERT Class 8 Geography, Chapter 5: Industries",
  "Manufacturing is a secondary activity: it turns raw materials into goods people can use. Industries are grouped by those materials. Agro-based units use farm or animal products, mineral-based units use ores, marine units use the sea, and forest-based units use wood and other forest produce. Size and ownership also matter. A cottage workshop needs little capital, while a large mill needs heavy machines. Private firms belong to people or companies, public firms to the government, joint firms to both, and cooperatives to their members. Amul is a famous cooperative. A plant is sited where raw material, land, water, labour, power, capital, transport, and a market can meet. Iron and steel, cotton cloth, and information technology show how these needs differ. Careless industry also pollutes land, air, and water.",
  [
    row(
      "Manufacturing is called a secondary activity because it",
      "changes raw materials into finished goods",
      "only picks wild fruit and sells it unchanged",
      "only teaches children in a school",
      "only moves soldiers from camp to camp",
      "a secondary activity processes a raw material into a product people can use.",
      "gathering fruit and selling it as it is belongs with primary activities, not with manufacturing.",
      "teaching is a service. Services are tertiary activities, not the manufacturing of goods.",
      "moving troops does not turn a raw material into a finished good.",
    ),
    row(
      "Which of these is an agro-based industry?",
      "A cotton mill that makes cloth from raw cotton",
      "A steel plant that smelts iron ore",
      "A unit that makes oil from sea fish",
      "A paper mill that uses wood pulp from forests",
      "cotton is a farm product, so a cotton mill is agro-based.",
      "iron ore is a mineral, so a steel plant is mineral-based.",
      "fish from the sea make that unit marine-based.",
      "wood pulp from forests makes a paper mill forest-based.",
    ),
    row(
      "Which of these is a mineral-based industry?",
      "An iron and steel plant",
      "A dairy that packs milk from farms",
      "A workshop that cans ocean fish",
      "A furniture unit that uses only timber",
      "iron and steel are made from mineral ores, so the plant is mineral-based.",
      "milk comes from animals on farms, so a dairy is agro-based.",
      "ocean fish make the workshop marine-based.",
      "timber comes from forests, so that furniture unit is forest-based.",
    ),
    row(
      "A marine-based industry gets its raw material mainly from",
      "the sea, for example fish used to make fish oil",
      "an iron-ore mine inland",
      "a cotton field",
      "a teak forest and nowhere else",
      "marine-based industries use products of the sea and the ocean.",
      "iron ore is a mineral, not a product of the sea.",
      "cotton is a farm crop, so it feeds an agro-based industry.",
      "teak is a forest product, used by forest-based industries.",
    ),
    row(
      "Which of these is a forest-based industry?",
      "A paper mill that uses wood pulp",
      "A steel plant",
      "A cotton textile mill",
      "A fish-processing plant",
      "paper made from wood uses a forest product, so the mill is forest-based.",
      "a steel plant uses mineral ore.",
      "a cotton mill uses a farm fibre.",
      "a fish-processing plant uses the sea.",
    ),
    row(
      "A cottage or small-scale industry usually",
      "works with little capital and simple tools, often at home",
      "runs giant furnaces and employs a huge workforce",
      "must be owned by the central government",
      "can exist only in a foreign information-technology city",
      "basket weaving, pottery, and similar household crafts use small capital and few workers.",
      "giant furnaces and a huge workforce describe a large-scale industry.",
      "ownership by the government is a separate point. A cottage unit is often private or family-run.",
      "place does not define a cottage industry, and it is not limited to one foreign city.",
    ),
    row(
      "A large-scale industry is best described as one that",
      "uses large capital, heavy machines, and a big workforce",
      "is a single potter working alone at home",
      "is a weekly stall in a village market",
      "is a family growing food only for itself",
      "large-scale industries, such as heavy machinery, need big investment and many workers.",
      "one potter at home is a cottage industry.",
      "a weekly stall is a small trading place, not a large factory.",
      "growing food for the family is farming, not a large-scale industry.",
    ),
    row(
      "Amul, the milk union at Anand, is an example of",
      "a cooperative owned by the producers who supply the milk",
      "a public-sector steel plant owned only by the Union government",
      "a one-person workshop with no group of members",
      "a private company with no producers as owners",
      "Amul is a cooperative. Milk producers own it and share in its work.",
      "a government steel plant is in the public sector, not a milk cooperative.",
      "a one-person workshop has no member-owners of the Amul kind.",
      "a private company owned without its producers is not the cooperative model.",
    ),
    row(
      "A public-sector industry is owned by",
      "the government",
      "only a private family, with no government share",
      "only the milk producers, as in a cooperative",
      "nobody at all",
      "public-sector units, such as a government steel company, belong to the state.",
      "a private family firm is in the private sector.",
      "milk producers owning the unit together make a cooperative, not a public-sector firm.",
      "every industry has an owner or owners. It is not ownerless.",
    ),
    row(
      "A joint-sector industry is owned by",
      "the government and private partners together",
      "only foreign tourists passing through a city",
      "only the soldiers of one regiment",
      "no one, because joint ownership means there is no owner",
      "in the joint sector the state and private partners share the ownership.",
      "tourists do not become the owners of an industry by visiting.",
      "a regiment is not an industrial owner of this kind.",
      "joint ownership means two sides own it, not that it has no owner.",
    ),
    row(
      "The Tata Iron and Steel Company, set up by a private business house, is",
      "a private-sector industry",
      "a cooperative of milk producers",
      "a court of law",
      "a village assembly of voters",
      "TISCO was started by the Tatas, a private business house, so it is in the private sector.",
      "a milk cooperative such as Amul is owned by its producer members.",
      "a court belongs to the judiciary, not to industrial ownership.",
      "a village assembly is local government, not a steel company.",
    ),
    row(
      "Which set most affects the place chosen for a factory?",
      "Raw material, land, water, labour, power, capital, transport, and market",
      "Only the colour of the factory gate",
      "A rule that raw material must be kept as far away as possible",
      "The total absence of roads, power, and water",
      "factories are located where materials, power, workers, money, transport, and buyers can be brought together.",
      "gate colour does not decide an industrial location.",
      "being far from raw material raises cost, so it is not a reason to choose a site.",
      "roads, power, and water are needs. Their absence drives industry away.",
    ),
    row(
      "TISCO was set up at Jamshedpur in",
      "1907",
      "1757",
      "1857",
      "1947",
      "the Tata iron and steel works began at Sakchi, now Jamshedpur, in 1907.",
      "1757 is the year of the Battle of Plassey, not of this steel plant.",
      "1857 is the year of the great revolt, not of TISCO.",
      "1947 is the year of Independence, long after the plant had started.",
    ),
    row(
      "The main mineral inputs of an iron and steel plant are",
      "iron ore, coal, and limestone",
      "raw cotton, silk, and jute",
      "tea, coffee, and cocoa",
      "sea fish, pearls, and seaweed",
      "steel-making needs iron ore, coal for fuel, and limestone as a flux.",
      "cotton, silk, and jute are fibres for textile mills.",
      "tea, coffee, and cocoa are plantation crops, not steel inputs.",
      "fish and other sea products feed marine-based industries.",
    ),
    row(
      "Jamshedpur suited a steel plant mainly because",
      "iron ore, coal, other minerals, water, and a railway were available nearby",
      "it lay in a cold desert with no minerals and no river",
      "it had no railway and no source of water",
      "it was chosen only because tea grew on snowy peaks there",
      "Sakchi was near coal, iron ore, and other minerals, with water from the Subarnarekha and Kharkai rivers and a rail link.",
      "a cold desert without minerals could not feed a steel plant.",
      "the site was chosen because water and rail were present, not absent.",
      "tea gardens were not the reason for a steel city.",
    ),
    row(
      "Pittsburgh is known in this chapter as",
      "an important steel centre in the United States",
      "the earlier name of Jamshedpur",
      "a cotton-textile city in Japan",
      "a centre of shifting cultivation",
      "Pittsburgh grew as a steel city, with coal nearby and iron ore brought in by the Great Lakes route.",
      "Jamshedpur was earlier called Sakchi, not Pittsburgh.",
      "Osaka, not Pittsburgh, is the Japanese cotton city in this chapter.",
      "shifting cultivation is a kind of farming, not a steel city.",
    ),
    row(
      "Ahmedabad became a major centre of",
      "the cotton textile industry",
      "deep-sea fishing as its only work",
      "iron-ore mining in Minnesota",
      "information technology in the year 1600",
      "Ahmedabad, on the Sabarmati and close to cotton-growing areas, grew into a great cotton-mill city.",
      "its fame in this chapter is cloth, not ocean fishing.",
      "Minnesota supplied iron ore towards Pittsburgh, and it is not Ahmedabad.",
      "information technology is a modern industry, and 1600 is the century of the Company's charter.",
    ),
    row(
      "Osaka came to be called the Manchester of Japan because of its",
      "cotton textile industry",
      "gold mines in the Thar Desert",
      "polar ice sheets",
      "ban on all cloth making",
      "Osaka's cotton mills were so important that it was nicknamed the Manchester of Japan.",
      "the Thar Desert is in India and is not a Japanese textile city.",
      "polar ice has no link with Osaka's mills.",
      "Osaka made cloth. It did not ban cloth making.",
    ),
    row(
      "Bengaluru is a leading Indian centre of",
      "the information technology industry",
      "the Tata steel plant started in 1907",
      "marine fishing as its only industry",
      "the Doctrine of Lapse",
      "Bengaluru, often called the Silicon Valley of India, grew with skilled workers and electronic links rather than heavy ore.",
      "the 1907 Tata steel plant is at Jamshedpur, not Bengaluru.",
      "Bengaluru is not a city whose only work is sea fishing.",
      "the Doctrine of Lapse was a Company policy of annexation, not an industry of Bengaluru.",
    ),
    row(
      "Silicon Valley, a famous information-technology region, is in",
      "California in the United States",
      "the Thar Desert",
      "the high Himalaya",
      "Antarctica",
      "Silicon Valley is in California. Bengaluru is often compared with it.",
      "the Thar is a hot desert, not this technology region.",
      "the high Himalaya is not Silicon Valley.",
      "Antarctica has no such industrial region.",
    ),
    row(
      "The Bhopal gas tragedy of 1984 involved a leak of",
      "methyl isocyanate from a pesticide factory",
      "steam from a household kettle",
      "oxygen given out by trees in a park",
      "clean drinking water from a municipal tap",
      "in December 1984 methyl isocyanate gas leaked from the Union Carbide pesticide plant at Bhopal and killed and injured many people.",
      "steam from a kettle is not the poisonous gas of that disaster.",
      "oxygen from trees is not a toxic industrial leak.",
      "drinking water was not the substance that escaped.",
    ),
    row(
      "Careless industry can pollute",
      "land, air, and water around the factory",
      "nothing at all, because smoke and waste disappear harmlessly",
      "only the surface of the Moon",
      "only fossils on another continent",
      "smoke, chemical waste, and dumping harm the air, the water, and the land nearby.",
      "waste does not vanish. It pollutes.",
      "factory pollution acts on the Earth around the plant, not on the Moon.",
      "fossils on another continent are not the victim of a local factory's waste.",
    ),
    row(
      "Iron and steel is called a feeder industry because",
      "its products become raw material for many other industries",
      "it feeds cattle inside the blast furnace",
      "it grows food grains for the workers",
      "it has no link with any other factory",
      "machines, buildings, vehicles, and tools need steel, so this industry feeds other industries.",
      "a blast furnace smelts metal. It does not feed cattle.",
      "steel plants do not grow grain.",
      "the whole point of a feeder industry is its link with other factories.",
    ),
    row(
      "The Chotanagpur plateau became an important industrial region largely because",
      "it is rich in minerals such as coal and iron ore",
      "it is a polar ice cap",
      "it has no minerals and no transport",
      "it lies on the deep floor of the Pacific Ocean",
      "coal, iron ore, and other minerals drew mines and factories to this plateau.",
      "the plateau is in eastern India, not in the polar regions.",
      "minerals and transport are present there. Their absence is not the story.",
      "it is land in India, not the ocean floor.",
    ),
  ],
);

const population = topic(
  "t-population",
  "Human resources",
  "NCERT Class 8 Geography, Chapter 6: Human Resources",
  "People are a country's most important resource, because their ideas and work turn other things into useful resources. They are not spread evenly. Population density is the number of people living in one square kilometre. South and South-East Asia, Europe, and north-eastern North America are crowded. High latitudes, tropical deserts, high mountains, and equatorial forests have few people. Plains, a milder climate, fertile soil, fresh water, and minerals attract settlement. Culture, jobs, and a long history of settlement matter as well. Numbers change through births, deaths, and migration. The birth rate minus the death rate is the natural growth rate. A population pyramid with a broad base shows many young people, and a narrow top shows fewer elderly people. India has a large young population.",
  [
    row(
      "People are called a resource when",
      "their health, education, and skills help the country use other resources",
      "they are treated as a kind of coal",
      "they are unable to learn any skill",
      "they remove the need for land and water completely",
      "healthy, educated, skilled people create and use resources, so human beings are the ultimate resource.",
      "coal is a mineral fuel. People are not a mineral.",
      "people can learn, and education is how this resource improves.",
      "people still need land, water, and other natural resources.",
    ),
    row(
      "The world's population is distributed",
      "unevenly, with some regions crowded and others almost empty",
      "so that every square kilometre has the same number of people",
      "only in Antarctica",
      "in exactly the same way in every desert and every river plain",
      "some lands are packed with people and others have very few. The spread is uneven.",
      "density varies hugely from place to place.",
      "Antarctica is nearly empty, and most people live elsewhere.",
      "deserts are sparse and many river plains are crowded, so they are not the same.",
    ),
    row(
      "Population density means",
      "the number of people per square kilometre",
      "the number of rivers per person",
      "the height of one mountain",
      "the number of continents",
      "density is population divided by area, usually expressed as people in each square kilometre.",
      "rivers per person is not the meaning of density.",
      "mountain height is relief, not population density.",
      "the number of continents is a fixed geographic count, not density.",
    ),
    row(
      "Which of these regions is densely populated?",
      "South and South-East Asia",
      "The high latitudes near the poles",
      "The Sahara Desert",
      "The high peaks of the Himalaya",
      "South and South-East Asia hold some of the world's largest crowds of people.",
      "high latitudes are too cold for dense settlement.",
      "the Sahara lacks water, so few people live there.",
      "high peaks are steep and harsh, so they are sparsely populated.",
    ),
    row(
      "Which of these is also among the crowded parts of the world?",
      "Europe and north-eastern North America",
      "The equatorial forests of the Amazon",
      "The cold polar lands",
      "The tropical deserts",
      "Europe and the north-east of North America have long been densely settled.",
      "equatorial forests are among the sparsely populated regions.",
      "polar lands are too cold for large populations.",
      "tropical deserts have too little water for crowds.",
    ),
    row(
      "High latitudes have few people mainly because",
      "the climate is extremely cold for much of the year",
      "they contain the world's best rice plains",
      "they are the crowded cities of western Europe",
      "they are warm and wet throughout the year",
      "long, severe cold discourages farming and settlement in the high latitudes.",
      "rice plains lie in warmer monsoon lands, not in the polar latitudes.",
      "western Europe is densely populated and is not the empty high latitudes.",
      "high latitudes are cold, not warm and wet all year.",
    ),
    row(
      "Tropical deserts are sparsely populated mainly because",
      "water is scarce and the heat is extreme",
      "they are covered by thick equatorial forest",
      "they form the industrial belt of north-eastern North America",
      "heavy rain falls there in every month",
      "without enough water, and with fierce heat, few people can live in a tropical desert.",
      "equatorial forest is a different, wet environment.",
      "north-eastern North America is a crowded industrial region, not a desert.",
      "deserts are dry. They do not have heavy rain every month.",
    ),
    row(
      "High mountains are thinly populated because",
      "the slopes are steep, soils are often thin, and the climate is harsh",
      "every peak is a flat, easy plain",
      "farming is simpler on a cliff than on low land",
      "transport is always easier on a mountain than on a plain",
      "steep land, poor soil, and cold make large settlements difficult on high mountains.",
      "a peak is not a flat plain.",
      "cliffs are harder to farm than plains.",
      "mountains make transport harder, not easier.",
    ),
    row(
      "Equatorial forests have few large settlements because",
      "dense forest and a very hot, wet climate make settlement difficult",
      "they are cold deserts of ice",
      "they are the most crowded parts of Europe",
      "they receive no rain at all",
      "thick forest, heavy rain, and difficult transport have kept equatorial forest regions thinly peopled.",
      "equatorial forests are hot and wet, not icy deserts.",
      "Europe's crowded areas are not equatorial forests.",
      "these forests exist because rainfall is very high.",
    ),
    row(
      "People usually prefer plains to high mountains because",
      "plains are easier to farm, to build on, and to cross",
      "plains have no soil and no water",
      "farming is impossible on flat land",
      "mountains always have better roads than plains",
      "flat, fertile plains suit fields, houses, and roads, so more people settle there.",
      "many plains have deep soil and rivers.",
      "flat land is often the easiest land to farm.",
      "building roads is generally harder in high mountains.",
    ),
    row(
      "Climate affects where people live because",
      "most people avoid places that are extremely hot or extremely cold",
      "climate has never influenced any settlement",
      "farming is easy on permanent ice",
      "a harsh climate always raises the density of population",
      "moderate climates are easier to live and farm in, so extremes tend to stay empty.",
      "climate is one of the main geographic factors in population distribution.",
      "permanent ice will not support ordinary farming.",
      "harsh climates usually have fewer people, not more.",
    ),
    row(
      "Fertile soil attracts people because",
      "it supports farming and a steady supply of food",
      "it stops every crop from growing",
      "people prefer land on which nothing can be grown",
      "soil has no link with settlement",
      "river plains such as the Ganga plain are crowded partly because their soils yield food.",
      "fertile soil helps crops. It does not stop them.",
      "people seek land that can grow food, not barren land.",
      "soil and food supply strongly affect where farmers settle.",
    ),
    row(
      "Fresh water draws settlement because",
      "people need it for drinking, farming, and daily life",
      "deserts are crowded because they lack water",
      "river valleys are always empty",
      "water makes farming impossible",
      "towns and villages cluster where drinking and irrigation water can be had.",
      "lack of water is why deserts are sparse, not crowded.",
      "many river valleys are among the most crowded places.",
      "water makes farming possible.",
    ),
    row(
      "Mineral wealth can increase population because",
      "mines and oilfields create work and draw workers",
      "minerals force every person to leave",
      "a mining area can never grow into a town",
      "minerals remove the need for any workers",
      "people move to places where coal, oil, or other minerals provide jobs.",
      "minerals attract workers. They do not empty the land by themselves.",
      "mining towns are common around large deposits.",
      "mines need workers. They do not end the need for labour.",
    ),
    row(
      "Which of these is a social or historical reason for people to stay in a place?",
      "It has long been a centre of culture, religion, or settled life",
      "No one has ever lived there",
      "All houses and roads are forbidden",
      "It has no past and no community life",
      "places such as Varanasi remain crowded because of a long religious and cultural history, and old settled regions often stay populated.",
      "an empty past does not explain a crowd.",
      "a ban on houses and roads would drive people away.",
      "community life and history are exactly what this factor includes.",
    ),
    row(
      "An economic reason for a dense population is that",
      "industry and other jobs draw people to cities",
      "there is a total absence of work",
      "every factory and every shop is forbidden",
      "people wish to live where nobody is employed",
      "cities such as Mumbai and Osaka grew large because factories and services offered work.",
      "absence of work pushes people away.",
      "forbidding shops and factories would remove the economic pull.",
      "people move towards employment, not towards a place with no jobs.",
    ),
    row(
      "The number of people in a region changes through",
      "births, deaths, and migration",
      "only the renaming of a river",
      "the colour of the national flag",
      "the number of longitudes drawn on a map",
      "babies add people, deaths remove them, and migration moves them in or out.",
      "a new river name does not change how many people live there.",
      "a flag's colour is not a population process.",
      "lines of longitude are a map grid, not a cause of population change.",
    ),
    row(
      "The birth rate is",
      "the number of live births per 1,000 people in a year",
      "the number of deaths per 1,000 people in a year",
      "the number of people leaving a country",
      "the area of a country in square kilometres",
      "birth rate counts live births against each thousand of the population in one year.",
      "deaths per thousand are the death rate, not the birth rate.",
      "people leaving are emigrants, which is migration, not the birth rate.",
      "area is used for density, not for the birth rate.",
    ),
    row(
      "The death rate is",
      "the number of deaths per 1,000 people in a year",
      "the number of live births per 1,000 people in a year",
      "the number of schools in a district",
      "the length of the coastline",
      "death rate counts deaths against each thousand people in one year.",
      "live births per thousand are the birth rate.",
      "a count of schools is not the death rate.",
      "coastline length is a geographic measure, not a population rate.",
    ),
    row(
      "The natural growth rate of population is",
      "the birth rate minus the death rate",
      "the death rate minus the area of the country",
      "only the number of people who migrate",
      "the number of factories added to the number of rivers",
      "when births are counted against deaths, the difference is natural growth. Migration is counted separately.",
      "area is not subtracted from the death rate to find natural growth.",
      "migration changes numbers, but it is not part of natural growth.",
      "factories and rivers are not a population formula.",
    ),
    row(
      "Migration means",
      "the movement of people into or out of a place",
      "the birth of a child in a hospital",
      "the weathering of parent rock into soil",
      "the scale printed on a map",
      "people who arrive are immigrants and people who leave are emigrants. Both are migration.",
      "a birth is part of the birth rate, not migration.",
      "weathering is a soil process, not a movement of people.",
      "a map scale compares distances. It is not migration.",
    ),
    row(
      "A population pyramid with a broad base shows",
      "a large number of young people",
      "that almost everyone is over the age of ninety",
      "that no children have been born",
      "the height of the Himalaya",
      "the base of the pyramid stands for the youngest ages, so a wide base means many children and young people.",
      "the very old appear at the narrow top, not as a wide base.",
      "a broad base means many births, not none.",
      "the pyramid is a population diagram, not a mountain height.",
    ),
    row(
      "A narrow top on a population pyramid shows",
      "fewer people in the oldest age groups",
      "more babies than any other age group",
      "that the country has no adults at all",
      "the width of a river",
      "the top stands for the elderly. A narrow top means relatively few people live to old age.",
      "babies are shown at the base, not at the top.",
      "adults occupy the middle of the pyramid. A narrow top does not erase them.",
      "a river's width is not what the pyramid measures.",
    ),
    row(
      "India's population pyramid has a broad base. This means that",
      "India has a large young population",
      "India has almost no children",
      "every person in India is elderly",
      "India has no population",
      "a wide base shows that young people form a large share of India's population.",
      "a broad base means many children, not almost none.",
      "the elderly are the smaller group at the top.",
      "India is one of the world's most populous countries.",
    ),
  ],
);

const constitution = topic(
  "t-constitution",
  "The Indian Constitution",
  "NCERT Class 8 Social and Political Life, Chapter 1",
  "A constitution is a shared rule book. People need it so they can trust one another, coordinate their lives, know who holds power, and stop that power from being misused. It also states the hopes of the society. After a people's movement, Nepal adopted a constitution to build a democracy. India's Constitution came into effect on 26 January 1950. Dr B.R. Ambedkar chaired the Drafting Committee. Key features include federalism, a parliamentary form of government, and a separation of powers. Fundamental Rights protect equality, freedom, religion, culture and education, and they bar exploitation. Citizens may move the courts to enforce them. Directive Principles guide the government, but a court cannot enforce them in the same direct way. A law that breaks a Fundamental Right can be struck down.",
  [
    row(
      "One reason a country needs a constitution is that people must be able to",
      "trust a common set of rules",
      "live with no rules of any kind",
      "let each leader invent a fresh law every hour",
      "keep the rules a secret from the public",
      "a constitution is an agreement on basic rules, so citizens can trust that the same rules bind everyone.",
      "a society cannot coordinate if it has no shared rules.",
      "changing the basic law every hour would destroy trust and coordination.",
      "the rules have to be known. A secret constitution cannot guide the people.",
    ),
    row(
      "A constitution helps people coordinate because it",
      "sets out how the institutions of the country will work together",
      "forbids all cooperation",
      "closes every school and every office",
      "replaces every map of India",
      "when the rules say who does what, governments, courts, and citizens can act together.",
      "coordination is a purpose of the constitution, not something it forbids.",
      "the constitution does not exist to shut schools and offices.",
      "maps are not what a constitution replaces.",
    ),
    row(
      "The constitution states who has power so that",
      "citizens know which institution may take which decision",
      "nobody is allowed to know who governs",
      "only a private club may govern in secret",
      "power is handed to the weather",
      "writing down who may make laws, carry them out, and judge them prevents confusion about authority.",
      "the point of the document is that power is known, not hidden.",
      "a secret club is the opposite of a public constitution.",
      "political power belongs to human institutions, not to the weather.",
    ),
    row(
      "Limits on power are written into a constitution so that",
      "rulers cannot use authority in any way they please",
      "a ruler may do anything without a check",
      "the people lose every right",
      "the courts are abolished",
      "Fundamental Rights and the division of powers stop leaders from becoming arbitrary.",
      "unlimited personal rule is what the limits are meant to prevent.",
      "the constitution protects rights. It does not wipe them out.",
      "courts are part of the system that enforces the limits.",
    ),
    row(
      "The aspirations in a constitution are",
      "the goals a society sets for itself, such as justice and equality",
      "a list of prices in a shop",
      "a weather chart for the next week",
      "a ban on every hope of fairness",
      "the constitution records what the people hope the country will become, including justice and equality.",
      "shop prices are not the goals of the nation.",
      "a weather chart is not a statement of political hopes.",
      "aspirations are hopes of fairness, not a ban on them.",
    ),
    row(
      "After a people's movement, Nepal",
      "adopted a constitution in order to shape a democratic government",
      "became a trading post of the East India Company in 1600",
      "decided that a country should have no written rules",
      "was annexed under the Doctrine of Lapse",
      "the people's movement in Nepal led to a democratic constitution that would limit the king's power.",
      "the Company's charter of 1600 has nothing to do with modern Nepal.",
      "Nepal moved towards written constitutional rules, not away from them.",
      "the Doctrine of Lapse was a nineteenth-century Company policy in India, not Nepal's story.",
    ),
    row(
      "Federalism in the Indian Constitution means that",
      "power is divided among more than one level of government",
      "only a single official holds every power",
      "the army writes every law",
      "village councils are forbidden",
      "the Union and the states, and later local governments, each have powers of their own.",
      "federalism is the opposite of putting every power in one person's hands.",
      "law-making belongs to legislatures, not to the army.",
      "local government fits the idea of more than one level. It is not forbidden by federalism.",
    ),
    row(
      "The parliamentary form of government means that",
      "people elect representatives, and the government is answerable to the legislature",
      "a king rules with no election and no duty to explain himself",
      "judges run the ministries as their daily job",
      "the army chooses the Prime Minister by a parade",
      "voters elect Parliament, and the Council of Ministers must answer to it.",
      "a parliamentary system is based on election and answerability, not on unchecked personal rule.",
      "ministers come from the legislature. Judges do not run the ministries.",
      "the Prime Minister is the leader of the majority in Parliament, not a choice of the army.",
    ),
    row(
      "Separation of powers means that",
      "the legislature, the executive, and the judiciary have different roles",
      "one person makes the law, applies it, and judges it with no check",
      "only the police may write the constitution",
      "the courts are shut down",
      "law-making, carrying out the law, and judging cases are kept distinct so that no organ swallows the others.",
      "giving all three jobs to one person is the concentration of power that this feature avoids.",
      "the police do not write the constitution.",
      "the judiciary is one of the three organs. It is not shut down.",
    ),
    row(
      "Which of these is a Fundamental Right?",
      "The right to equality",
      "The right of a factory to pollute a river",
      "The right of a ruler to ignore the courts",
      "The right to practise untouchability",
      "the right to equality is one of the Fundamental Rights protected by the Constitution.",
      "polluting a river is not a Fundamental Right.",
      "rulers are under the Constitution. Ignoring the courts is not a right.",
      "untouchability is abolished. Practising it is not a right.",
    ),
    row(
      "The right to freedom, the right against exploitation, and cultural and educational rights are",
      "Fundamental Rights in the Indian Constitution",
      "only lines in a private diary",
      "names of soil types",
      "taxes collected by the East India Company",
      "these three, together with equality, freedom of religion, and constitutional remedies, are Fundamental Rights.",
      "they are constitutional rights, not private notes.",
      "soil types belong to geography, not to this list of rights.",
      "Company taxes are colonial history, not these rights.",
    ),
    row(
      "The right to freedom of religion means that",
      "people may follow and practise their faith",
      "the state must impose one religion on everyone",
      "all religious belief is a crime",
      "only one community is allowed to pray",
      "freedom of religion lets citizens profess, practise, and follow their own faith.",
      "imposing one religion would end that freedom.",
      "belief itself is not a crime in this secular constitution.",
      "the right belongs to people of every faith, not to one community alone.",
    ),
    row(
      "The Right to Constitutional Remedies allows a citizen to",
      "move the courts if a Fundamental Right is violated",
      "cancel the Constitution by a private letter",
      "appoint the Prime Minister alone",
      "close the Supreme Court",
      "this right lets a person ask the courts to enforce the other Fundamental Rights. Dr Ambedkar called it the heart and soul of the Constitution.",
      "a private letter cannot cancel the Constitution.",
      "the Prime Minister is chosen through the parliamentary majority, not by one citizen's letter.",
      "the remedy uses the courts. It does not close them.",
    ),
    row(
      "Directive Principles differ from Fundamental Rights because they",
      "guide the government but are not directly enforceable by a court in the same way",
      "are the only rules a court is allowed to enforce",
      "were issued by the East India Company in 1757",
      "replace the Constitution",
      "Directive Principles are instructions for governance. A citizen cannot enforce them in court as Fundamental Rights are enforced.",
      "it is the Fundamental Rights, not the Directive Principles, that the courts directly enforce.",
      "they are part of the Indian Constitution, not a Company order of 1757.",
      "they sit inside the Constitution. They do not replace it.",
    ),
    row(
      "The Indian Constitution came into effect on",
      "26 January 1950",
      "15 August 1947",
      "26 January 1930",
      "10 May 1857",
      "26 January 1950 is the day the Constitution commenced, which is why it is celebrated as Republic Day.",
      "15 August 1947 is Independence Day, when British rule ended, not the day the Constitution came into effect.",
      "26 January 1930 was an earlier independence pledge, not the commencement of this Constitution.",
      "10 May 1857 is the start of the Meerut rising.",
    ),
    row(
      "The Constituent Assembly adopted the Constitution on",
      "26 November 1949",
      "26 January 1950",
      "13 April 1919",
      "12 March 1930",
      "the Assembly adopted the Constitution on 26 November 1949, and it came into effect later, on 26 January 1950.",
      "26 January 1950 is the date it came into force, not the date it was adopted.",
      "13 April 1919 is the date of the Jallianwala Bagh firing.",
      "12 March 1930 is the day the Salt March began.",
    ),
    row(
      "Dr B.R. Ambedkar was",
      "Chairman of the Drafting Committee of the Constitution",
      "the first Viceroy of India",
      "the Nawab of Bengal defeated at Plassey",
      "the founder of the East India Company",
      "the Constituent Assembly appointed Dr Ambedkar to chair the committee that drafted the Constitution.",
      "Lord Canning became the first Viceroy in 1858.",
      "Siraj-ud-daulah was the Nawab defeated at Plassey.",
      "the Company received its charter in 1600, long before Ambedkar.",
    ),
    row(
      "Dr Rajendra Prasad is remembered here as",
      "President of the Constituent Assembly",
      "Chairman of the Drafting Committee",
      "the general who ordered the firing at Jallianwala Bagh",
      "the Mughal emperor exiled after 1857",
      "Dr Rajendra Prasad presided over the Constituent Assembly. He should not be confused with Dr Ambedkar, who chaired the Drafting Committee.",
      "the Drafting Committee was chaired by Dr B.R. Ambedkar.",
      "General Dyer ordered the firing at Jallianwala Bagh.",
      "Bahadur Shah Zafar was the emperor exiled to Rangoon.",
    ),
    row(
      "A law that violates Fundamental Rights can be",
      "struck down by the courts",
      "placed above the Constitution",
      "hidden from every judge",
      "turned automatically into a Fundamental Right",
      "judicial review allows the courts to declare such a law void because the Constitution is higher than an ordinary law.",
      "no ordinary law stands above the Constitution.",
      "courts exist to examine laws. They are not barred from seeing them.",
      "a law that breaks a right is invalid. It does not become a right.",
    ),
    row(
      "Secularism, as a feature of this Constitution, means that",
      "the state does not set up any one religion as the official religion",
      "the state must promote only one faith",
      "all religious belief is banned",
      "only soldiers may worship",
      "the Indian state has no official religion and must treat citizens of every faith as equals.",
      "promoting one faith as the state religion would contradict secularism.",
      "secularism is not a ban on belief.",
      "freedom of religion belongs to the people, not only to soldiers.",
    ),
    row(
      "The Preamble of the Constitution opens with the words",
      "We, the People of India",
      "By order of the East India Company",
      "Doctrine of Lapse",
      "Swaraj is my birthright",
      "the Preamble begins 'We, the People of India', showing that the authority of the Constitution comes from the people.",
      "the Company did not issue the Preamble.",
      "the Doctrine of Lapse was a colonial annexation policy.",
      "Tilak's line belongs to the national movement, not to the opening of the Preamble.",
    ),
    row(
      "Which pairing of organs is correct?",
      "The legislature makes laws, and the judiciary interprets them",
      "The judiciary collects the land revenue of Bengal",
      "The executive carves Ashoka's edicts",
      "The legislature commands the sepoys at Meerut",
      "Parliament and the state legislatures make laws, while courts interpret the laws and the Constitution.",
      "collecting Bengal's revenue was the Company's Diwani, not the work of today's judiciary.",
      "Ashoka's edicts are ancient inscriptions, not the job of the modern executive.",
      "the Meerut sepoys belong to the revolt of 1857, not to the legislature.",
    ),
    row(
      "Fundamental Rights matter in daily life because",
      "the courts can enforce them when they are broken",
      "they are secret notes with no legal force",
      "they apply only inside one princely state of the 1840s",
      "they allow the practice of untouchability",
      "a citizen can approach a court, especially under the Right to Constitutional Remedies, if a Fundamental Right is violated.",
      "these rights are public constitutional guarantees, not secret notes.",
      "they protect people throughout India today, not one old princely state.",
      "Article 17 abolishes untouchability, so the rights do not allow it.",
    ),
    row(
      "The Indian Constitution was framed by",
      "the Constituent Assembly",
      "the English East India Company in 1600",
      "General Dyer in 1919",
      "the Viceroy alone, with no Indian members",
      "a Constituent Assembly of Indian representatives drafted the Constitution between 1946 and 1949.",
      "the Company of 1600 was a trading corporation, not the maker of this Constitution.",
      "General Dyer ordered the Jallianwala Bagh firing. He did not frame the Constitution.",
      "Indians in the Assembly, including the Drafting Committee, wrote it. It was not the Viceroy's solo work.",
    ),
  ],
);

const secularism = topic(
  "t-secularism",
  "Understanding secularism",
  "NCERT Class 8 Social and Political Life, Chapter 2",
  "Indian secularism means the state does not promote any one religion. It keeps a principled distance so that people of every faith stand as equals. This is not hostility to religion. People remain free to believe and to worship. The state may still step in when a religious practice violates fundamental rights. The ban on untouchability is the clearest example. France follows a stricter separation and does not allow conspicuous religious signs in its state schools. India allows religious communities a degree of freedom in their own affairs and can also support schools run by minorities. The Constitution forbids discrimination on the ground of religion. No community, majority or minority, may use the state to dominate another.",
  [
    row(
      "Indian secularism means that the state",
      "does not promote any one religion",
      "must adopt one official religion",
      "must ban every act of worship",
      "is ruled by the head of one shrine",
      "there is no state religion, and the government must not favour one faith over others.",
      "an official religion would end the secular character of the state.",
      "secularism protects the freedom to worship. It is not a ban on religion.",
      "the head of a shrine does not govern India.",
    ),
    row(
      "The Indian state keeps a distance from religion so that",
      "people of all faiths can be treated as equals",
      "one community can use the government against the others",
      "religious people lose the right to vote",
      "only the majority may hold a public job",
      "distance stops the state from becoming the arm of one religion, which protects equal citizenship.",
      "using the government against other faiths is domination, which secularism resists.",
      "the vote does not depend on giving up a faith.",
      "public jobs must be open to people of every religion.",
    ),
    row(
      "Which statement about Indian secularism is correct?",
      "It is not hostility to religion, and people remain free to follow a faith",
      "It means the state hates every religion and bans worship",
      "It means one religion becomes the official religion",
      "It means only the majority community has rights",
      "secularism refuses an official religion without becoming an enemy of religious life.",
      "banning worship would be hostility, which Indian secularism is not.",
      "there is no official religion of the Indian state.",
      "rights belong to citizens of every community, not only the majority.",
    ),
    row(
      "The state may intervene in a religious matter when",
      "a practice violates fundamental rights",
      "a family prays peacefully inside a private home",
      "someone lights a lamp at a home festival",
      "the practice harms nobody and breaks no right",
      "Indian secularism allows intervention so that religion is not used to deny equality or other fundamental rights.",
      "peaceful private prayer is part of religious freedom, not a reason for a ban.",
      "a home festival does not by itself violate anyone's rights.",
      "intervention is for a real violation, not for a harmless practice.",
    ),
    row(
      "Untouchability was banned because",
      "it denies equality and dignity, even if someone calls it a custom",
      "the Constitution orders every person to practise it",
      "it is a method of soil conservation",
      "the right to equality requires it",
      "Article 17 abolishes untouchability. A humiliating custom cannot override the right to equality.",
      "the Constitution forbids the practice. It does not order it.",
      "soil conservation is a geographic method and has nothing to do with this ban.",
      "equality is the reason the practice is forbidden, not a reason to continue it.",
    ),
    row(
      "A government school goes against secularism if it",
      "forces students to join the worship of one religion",
      "teaches pupils of every faith in the same classroom",
      "refuses to make one religion the school rule",
      "explains the constitutional value of equality",
      "a government school must not push one religion on its students.",
      "studying together is in keeping with equal citizenship.",
      "refusing an official school religion supports secularism.",
      "teaching equality supports the Constitution.",
    ),
    row(
      "In French state schools, pupils are not allowed to wear",
      "conspicuous religious signs",
      "ordinary reading glasses",
      "the school uniform socks",
      "a wristwatch with no religious mark",
      "France keeps religion out of its state schools by banning conspicuous signs such as a headscarf, a skullcap, or a large cross.",
      "reading glasses are not a religious sign.",
      "ordinary socks are not the object of that rule.",
      "a plain watch is not a conspicuous religious sign.",
    ),
    row(
      "The French rule about religious signs aims to",
      "keep religion out of state schools",
      "make one religion compulsory in every class",
      "close every school in the country",
      "hand each school to a single shrine",
      "the French state separates religion from its public schools more strictly than India does.",
      "compulsory worship of one religion would be the opposite of that separation.",
      "the rule regulates signs in school. It does not close the schools.",
      "handing schools to a shrine would tie the state to one religion.",
    ),
    row(
      "Indian secularism differs from that stricter French model because India",
      "gives religious communities some freedom and can support minority schools",
      "makes one religion the official religion of the country",
      "bans every school run by a minority",
      "rejects the idea of equality",
      "India keeps a principled distance, yet it also protects community life and minority education.",
      "India has no official religion.",
      "minority communities may establish educational institutions.",
      "equality of faiths is a central aim of Indian secularism.",
    ),
    row(
      "The Indian state may help minority schools in order to",
      "protect the educational rights of minority communities",
      "force those communities to abandon their religion",
      "establish one state religion",
      "stop children from learning to read",
      "support for minority schools is a way to safeguard culture and education, not a way to erase a faith.",
      "the help is not a tool to force people out of their religion.",
      "helping a minority school does not create an official state religion.",
      "the aim is education, not the ending of literacy.",
    ),
    row(
      "Discrimination on the ground of religion is",
      "prohibited by the Constitution",
      "required in every government job",
      "the main goal of secularism",
      "allowed whenever the majority votes for it",
      "the Constitution forbids the state from discriminating against citizens because of their religion.",
      "government jobs must not be reserved for one religion.",
      "secularism aims at equal treatment, not at discrimination.",
      "a majority vote cannot legalise religious discrimination.",
    ),
    row(
      "One aim of Indian secularism is to prevent",
      "one religious community from dominating another",
      "citizens from voting in an election",
      "courts from hearing cases about rights",
      "every private festival inside a home",
      "the state should stop a powerful community from using public power against a weaker one.",
      "voting is a democratic right and is not the target of secularism.",
      "courts are how rights are defended.",
      "a peaceful private festival is part of religious freedom.",
    ),
    row(
      "Indian secularism also tries to stop domination",
      "inside a religion, as when untouchability was banned",
      "of pupils who study mathematics",
      "of farmers who plough along the contour",
      "of judges who hear a civil dispute",
      "the ban on untouchability protects people inside a religious community from oppression by others of the same broad tradition.",
      "mathematics is not a religious domination.",
      "contour ploughing is a soil method.",
      "a civil judge's work is not this kind of religious domination.",
    ),
    row(
      "In a secular state the majority community",
      "must not use the state to impose its religion on others",
      "has a right to make its faith the official religion",
      "alone may be recruited to public jobs",
      "stands above the Constitution",
      "numbers do not give a community the right to capture the state for its own faith.",
      "an official religion would contradict Indian secularism.",
      "public employment is open across religions.",
      "every community is under the Constitution.",
    ),
    row(
      "A person of any faith has the right to",
      "follow and practise that faith",
      "be punished merely for holding it",
      "be refused a public school only because of it",
      "lose the vote because of a place of worship",
      "freedom of religion protects the practice of faith for every community.",
      "punishing belief itself would destroy that freedom.",
      "a public school may not shut its door on religious grounds.",
      "the vote is not taken away because of a place of worship.",
    ),
    row(
      "Which action fits Indian secularism?",
      "The state stops a religious practice that violates fundamental rights",
      "The state chooses one official religion",
      "The state shuts every place of worship forever",
      "The state gives government jobs to only one community",
      "intervention is allowed when a practice, such as untouchability, breaks fundamental rights.",
      "choosing an official religion abandons secularism.",
      "closing every place of worship would be hostility to religion.",
      "jobs reserved for one religion are discrimination.",
    ),
    row(
      "Which action does not fit Indian secularism?",
      "Hostility that tries to wipe out all religious belief",
      "Equal respect for people of every religion",
      "A legal ban on untouchability",
      "State support for a minority school",
      "Indian secularism is not an attack on faith itself.",
      "equal respect is the heart of this idea.",
      "the ban on untouchability is an accepted intervention.",
      "support for a minority school is part of the Indian approach.",
    ),
    row(
      "Government offices should",
      "not be used to promote one religion",
      "display the rites of only one faith as the state faith",
      "refuse entry to people of a minority religion",
      "collect a special tax from people who pray",
      "law courts, police stations, and government offices must not become advertisements for one religion.",
      "promoting one faith as the state faith breaks secularism.",
      "entry to a public office cannot depend on religion.",
      "a prayer tax would discriminate on the ground of religion.",
    ),
    row(
      "Principled distance means that the state",
      "stays apart from religion without becoming the enemy of faith",
      "merges itself with one religion",
      "bans every private belief",
      "lets one shrine write the criminal law",
      "the state neither runs a religion nor persecutes religious people.",
      "merging with one religion would create a state religion.",
      "private belief remains free.",
      "criminal law is made by the legislature under the Constitution, not by a shrine.",
    ),
    row(
      "Opening public jobs to people of every religion supports",
      "equality of citizens regardless of faith",
      "the rule that only one religion may serve the government",
      "the Doctrine of Lapse",
      "the practice of untouchability",
      "equal access to public employment is part of not discriminating on the ground of religion.",
      "limiting jobs to one religion would be discrimination.",
      "the Doctrine of Lapse was a colonial annexation policy.",
      "untouchability is abolished and is not supported by equal jobs.",
    ),
    row(
      "Freedom of religion does not allow a community to",
      "violate the fundamental rights of other people",
      "celebrate its own festival in peace",
      "run a school for its children within the law",
      "pray in its own place of worship",
      "religious freedom stops where another person's fundamental rights begin.",
      "a peaceful festival is protected.",
      "a lawful school is part of educational freedom.",
      "worship in one's own place is part of freedom of religion.",
    ),
    row(
      "If a custom humiliates a group of people, the secular state",
      "may step in to protect their fundamental rights",
      "must defend the custom because no custom can ever be questioned",
      "must adopt that custom as the official religion",
      "must punish the victims instead of the humiliation",
      "the ban on untouchability shows that the state can interfere to stop a humiliating religious custom.",
      "customs are not above fundamental rights.",
      "adopting the custom as a state religion would spread the harm.",
      "the victims are the people the law protects.",
    ),
    row(
      "Minority educational institutions have a place in Indian secularism because",
      "communities are allowed to preserve their culture and education",
      "minorities are forbidden to open any school",
      "only the largest community may run a school",
      "schooling is reserved for one religion",
      "cultural and educational rights let minorities establish institutions, and the state may support that freedom.",
      "minorities are not forbidden to open schools.",
      "schooling is not a monopoly of the largest community.",
      "education is not reserved for a single religion.",
    ),
    row(
      "The best short description of Indian secularism is",
      "equal respect for all religions, with room to stop a practice that breaks fundamental rights",
      "one official religion for the whole country",
      "a ban on every form of religious belief",
      "rule by the priests of the largest community",
      "the state treats faiths equally and still intervenes against a practice such as untouchability.",
      "one official religion would undo secularism.",
      "belief is not banned.",
      "priests of one community do not rule the state.",
    ),
  ],
);

const parliament = topic(
  "t-parliament",
  "Parliament and laws",
  "NCERT Class 8 Social and Political Life, Chapters 3 and 4: Why Do We Need a Parliament, and Understanding Laws",
  "Parliament represents the people at the national level. The party or coalition that holds a majority in the Lok Sabha forms the government, and its leader becomes the Prime Minister. Members question ministers, especially during Question Hour, so the government is both controlled and informed. The Lok Sabha is elected directly by the people. The Rajya Sabha represents the states. A bill becomes an Act only after Parliament passes it and the President gives assent. Laws apply to everyone. The rule of law means that no person is above the law. Citizens may criticise an unjust law, and Parliament can change it. The law against domestic violence came after years of public demand. If a law violates the Constitution, the courts can strike it down.",
  [
    row(
      "The Lok Sabha represents the people because its members are",
      "elected by the people",
      "appointed by a foreign trading company",
      "members of a private club with no voters",
      "chosen only by the army",
      "adult citizens elect Lok Sabha members, so the House speaks for the people.",
      "a foreign company does not appoint India's legislators.",
      "a private club is not an elected house.",
      "the army does not choose members of the Lok Sabha.",
    ),
    row(
      "The national government is formed by",
      "the party or coalition that has a majority in the Lok Sabha",
      "the party with the fewest seats",
      "only the side that lost the election",
      "a group that has never faced the voters",
      "the majority in the directly elected house provides the government.",
      "the smallest group cannot claim a majority.",
      "the losing side does not form the government.",
      "the government must rest on elected strength in the Lok Sabha.",
    ),
    row(
      "The Prime Minister is",
      "the leader of the majority party or of the ruling coalition",
      "the chief judge of the Supreme Court",
      "the public prosecutor in a criminal trial",
      "a civil servant who cannot be questioned",
      "the President invites the leader of the majority to become Prime Minister and to choose the Council of Ministers.",
      "the chief judge heads the judiciary, not the government.",
      "a public prosecutor argues criminal cases for the state.",
      "ministers must answer Parliament. They are not beyond question.",
    ),
    row(
      "Question Hour matters because",
      "members question ministers, and the government has to answer",
      "it is a time when every question is forbidden",
      "it replaces the Constitution",
      "it is only the army's lunch break",
      "during Question Hour, information comes out and ministers are held to account.",
      "the hour exists so that questions can be asked.",
      "questions do not replace the Constitution.",
      "it is a parliamentary sitting, not an army meal.",
    ),
    row(
      "By questions, debates, and committees, Parliament",
      "controls the government and keeps the public informed",
      "takes over the ploughing of every field",
      "collects the Diwani for the East India Company",
      "forbids every minister from speaking",
      "this control and information role stops the government from drifting away from the people.",
      "ploughing fields is not Parliament's work.",
      "the Diwani was an eighteenth-century revenue right of the Company.",
      "ministers are expected to speak and to answer.",
    ),
    row(
      "Members of the Lok Sabha are",
      "directly elected by the people",
      "born into their seats",
      "appointed by General Dyer",
      "chosen by the Nawab of Bengal",
      "the Lok Sabha is the house of the people, filled by direct election.",
      "seats are not hereditary.",
      "General Dyer was a colonial officer of 1919, not an appointing authority for this House.",
      "the Nawab of Bengal does not choose Lok Sabha members.",
    ),
    row(
      "The Rajya Sabha represents",
      "the states of India",
      "only the city of London",
      "only one religion",
      "the board of the East India Company",
      "the Council of States speaks for the states of the Union.",
      "London is not an Indian state represented in this House.",
      "the House is not organised by religion.",
      "the Company's board was a colonial trading body.",
    ),
    row(
      "A bill becomes an Act when",
      "Parliament passes it and the President gives assent",
      "a newspaper prints a rumour",
      "a crowd shouts one slogan",
      "a merchant seals a trading chest",
      "a proposal, called a bill, must pass through Parliament and receive the President's assent before it is law.",
      "a rumour is not a statute.",
      "a slogan does not by itself create an Act.",
      "a trading chest belongs to commerce, not to law-making.",
    ),
    row(
      "In India, the laws made by Parliament apply to",
      "everyone, including people who hold high office",
      "only the poor",
      "only the opposition parties",
      "nobody at all",
      "a general law binds all persons. Office does not place someone outside it.",
      "the law is not written for the poor alone.",
      "the opposition is not the only group that must obey.",
      "a law that applied to nobody would not be a law.",
    ),
    row(
      "The rule of law means that",
      "no person is above the law",
      "the Prime Minister may ignore every statute",
      "judges stand above the Constitution",
      "a powerful person cannot be questioned",
      "leaders, officials, and citizens are all subject to the same law.",
      "the Prime Minister is answerable and is not free to ignore statutes.",
      "judges interpret the Constitution. They are not above it.",
      "power does not bring immunity. Questioning those in office is part of democracy.",
    ),
    row(
      "If citizens believe a law is unjust, they may",
      "criticise it and ask Parliament to change it",
      "be forbidden to speak or to meet about it",
      "never write a word on the subject",
      "replace the Constitution with a roadside slogan",
      "democracy allows criticism, protest, and a demand that Parliament amend a harsh law.",
      "a total ban on speech and meetings would deny that democratic right.",
      "writing and campaigning are part of public debate.",
      "a slogan cannot replace the Constitution. Parliament changes laws by the proper process.",
    ),
    row(
      "Parliament can change an unjust law because",
      "it is the national law-making body and may pass a new law",
      "no statute can ever be amended",
      "only a foreign queen may change an Indian law today",
      "the courts have been abolished",
      "the same body that passes laws can repeal or amend them when the people show that a law is unfair.",
      "amendment is a normal power of a legislature.",
      "independent India is not ruled by a foreign queen.",
      "the courts continue to exist and can also strike down an unconstitutional law.",
    ),
    row(
      "The Protection of Women from Domestic Violence Act is a useful example because",
      "Parliament passed it after years of public demand, especially from women's groups",
      "the East India Company issued it in 1600",
      "it made criticism of every law a crime",
      "it said that violence at home is not a legal concern",
      "the 2005 law shows how campaigns can push Parliament to protect people inside the home.",
      "1600 is the year of the Company's charter, not of this Act.",
      "the Act responded to criticism. It did not ban criticism.",
      "the Act treats domestic violence as a legal wrong.",
    ),
    row(
      "An unconstitutional law can be",
      "struck down by the courts",
      "hidden from judges for ever",
      "made stronger than the Constitution by a speech",
      "enforced even when it destroys Fundamental Rights",
      "if a law breaks the Constitution, the courts may declare it void.",
      "judges are entitled to examine a law.",
      "a speech cannot lift a statute above the Constitution.",
      "a law that destroys Fundamental Rights is open to being struck down.",
    ),
    row(
      "The opposition in Parliament",
      "questions the government and points out its failures",
      "is forbidden to speak",
      "commands the army",
      "grants the Diwani of Bengal",
      "parties that are not in office use questions and debate to check the government.",
      "opposition members have the right to speak.",
      "the army is not commanded from the opposition benches.",
      "the Diwani was granted to the Company in 1765.",
    ),
    row(
      "A coalition is needed when",
      "no single party has a majority, so parties join together to govern",
      "every party refuses to take its seats",
      "the group with no seats rules alone",
      "the Constitution has been dissolved",
      "two or more parties can combine their seats to cross the majority mark.",
      "refusing seats does not create a government.",
      "a group with no seats has no majority.",
      "forming a coalition does not dissolve the Constitution.",
    ),
    row(
      "Universal adult franchise in elections to the Lok Sabha means that",
      "citizens who are 18 or older have the right to vote",
      "only men who own large estates may vote",
      "only people above 80 may vote",
      "the vote is limited to one religion",
      "every adult citizen has one vote, without a property, gender, or religious qualification.",
      "property and gender limits belonged to older, unfair franchises.",
      "the age is 18, not 80.",
      "religion does not decide who may vote.",
    ),
    row(
      "The Prime Minister and the Council of Ministers are",
      "answerable to the Lok Sabha",
      "free of any duty to explain their actions",
      "a branch of a district police station only",
      "appointed by the Nawab of Bengal",
      "the executive must keep the confidence of the directly elected house and answer its questions.",
      "answerability is the point of parliamentary government.",
      "ministers are not a local police post.",
      "the Nawab of Bengal does not appoint the Union Council of Ministers.",
    ),
    row(
      "Together with the two Houses, Parliament also includes",
      "the President",
      "only the Supreme Court",
      "only the state governors",
      "the board of a steel company",
      "Parliament consists of the President, the Lok Sabha, and the Rajya Sabha.",
      "the Supreme Court is part of the judiciary.",
      "governors head the states. They are not the third part of Parliament.",
      "a company board is not a house of Parliament.",
    ),
    row(
      "Citizens take part in law-making when they",
      "elect representatives and campaign for the laws they think the country needs",
      "are barred from every election",
      "leave every decision to a foreign trading company",
      "are told that criticism is always a crime",
      "elections, public debate, and organised demand are how people push Parliament to act.",
      "barring elections would end that participation.",
      "a foreign company is not the law-maker of the Republic.",
      "criticism of unjust laws is allowed.",
    ),
    row(
      "A money bill is introduced in the Lok Sabha because",
      "the directly elected house has the main voice on taxes and spending",
      "only the Rajya Sabha may tax the people, with no role for the Lok Sabha",
      "the army introduces every tax",
      "a weekly village market passes the Union budget",
      "money bills start in the house that the people elect directly.",
      "the Rajya Sabha does not have the sole power to tax.",
      "the army does not introduce tax bills.",
      "the Union budget is not passed by a village market.",
    ),
    row(
      "The Rajya Sabha differs from the Lok Sabha because",
      "it represents the states and is not elected directly by all the people",
      "every adult votes for it in the same direct way",
      "it commands the three armed forces",
      "it cannot discuss a national issue",
      "state legislatures elect its members, so it speaks for the states rather than by a direct national poll.",
      "direct election of all adults describes the Lok Sabha, not the Rajya Sabha.",
      "it does not command the armed forces.",
      "it does discuss national issues, including most bills.",
    ),
    row(
      "Before a proposal is passed and becomes law, it is called",
      "a bill",
      "an FIR",
      "a population pyramid",
      "a subsidiary alliance",
      "a bill is the draft placed before Parliament. After passage and assent it is an Act.",
      "an FIR is the first police report of a cognizable offence.",
      "a population pyramid is a diagram of age groups.",
      "a subsidiary alliance was a colonial treaty with an Indian ruler.",
    ),
    row(
      "The final assent that turns a passed bill into an Act is given by",
      "the President",
      "the public prosecutor",
      "a district judge acting without Parliament",
      "the chairperson of a milk cooperative",
      "after both Houses have done their part, the President assents and the bill becomes law.",
      "a public prosecutor argues criminal cases and does not assent to bills.",
      "a district judge does not replace Parliament and the President.",
      "a cooperative chairperson runs a members' enterprise, not the statute book.",
    ),
  ],
);

const judiciary = topic(
  "t-judiciary",
  "Judiciary",
  "NCERT Class 8 Social and Political Life, Chapter 5: Judiciary",
  "India's judiciary is independent, so judges decide without orders from the government. Courts settle disputes between people, between people and the government, and between governments. Judicial review lets them set aside a law that breaks the Constitution, and they uphold Fundamental Rights. The system is integrated. The Supreme Court is at the top, High Courts serve the states, and district courts hear local cases. Higher courts bind the courts below. Public interest litigation lets a person raise a public issue even without a personal injury. An FIR starts a criminal case at the police station. A public prosecutor presents the state's case, and the judge does not take sides. Criminal cases concern crimes against society. Civil cases concern disputes such as property or a contract.",
  [
    row(
      "An independent judiciary means that judges",
      "decide cases without pressure from the government",
      "take a minister's order on every verdict",
      "are replaced by the police at the end of each week",
      "also manage the government's factories",
      "independence lets a court apply the law even when the government is one of the parties.",
      "a minister's order on the verdict would destroy independence.",
      "the police do not rotate judges out of office each week.",
      "running factories would mix the court with the executive.",
    ),
    row(
      "Judicial independence matters because it",
      "protects rights even when a case is brought against the government",
      "lets ministers write the judgment",
      "removes the right to appeal",
      "cancels the Constitution",
      "citizens can challenge the state only if judges are free of its pressure.",
      "ministers do not write judgments.",
      "appeal to a higher court remains part of the system.",
      "independence upholds the Constitution. It does not cancel it.",
    ),
    row(
      "Dispute resolution by the courts means that they",
      "settle conflicts according to the law",
      "grow the crops of the two sides",
      "collect the Diwani of Bengal",
      "partition a province for administrative ease",
      "courts hear both sides and decide the dispute under law.",
      "growing crops is not adjudication.",
      "the Diwani was a revenue right of the Company.",
      "partitioning a province is not the judicial role described here.",
    ),
    row(
      "Which of these disputes can come before a court?",
      "A dispute between two citizens, or between a citizen and the government",
      "A request to change the weather",
      "No dispute of any kind",
      "A private note that names no right and no duty",
      "the judiciary resolves conflicts among citizens and between citizens and the state, and also disputes between governments.",
      "the weather is not a legal dispute.",
      "hearing disputes is a basic job of the courts.",
      "a note that raises no legal claim is not a case.",
    ),
    row(
      "Judicial review is the power to",
      "examine whether a law agrees with the Constitution",
      "review a film for a cinema hall",
      "rewrite school history books every month",
      "appoint the Nawab of Bengal",
      "the courts compare a law with the Constitution and can set the law aside if it does not agree.",
      "a film review is not constitutional review.",
      "monthly rewriting of textbooks is not judicial review.",
      "the Nawab of Bengal is not appointed by this power.",
    ),
    row(
      "If a law breaks the Constitution, the Supreme Court may",
      "strike that law down",
      "hide the law and still enforce it",
      "declare the law to be a Fundamental Right",
      "send it to the East India Company for approval",
      "striking down an unconstitutional law is how judicial review protects the Constitution.",
      "a court does not hide a bad law and enforce it.",
      "a law that breaks rights does not become a right.",
      "the Company does not approve modern statutes.",
    ),
    row(
      "When courts uphold Fundamental Rights, they",
      "protect those rights if someone violates them",
      "ignore the rights whenever an official asks",
      "delete the rights from the Constitution",
      "permit the practice of untouchability",
      "enforcing Fundamental Rights is a central duty of the judiciary.",
      "an official's wish does not cancel a right.",
      "the courts guard the rights. They do not delete them.",
      "untouchability is abolished, and the courts do not permit it.",
    ),
    row(
      "The highest court in India is",
      "the Supreme Court",
      "a weekly village market",
      "the Rajya Sabha",
      "a single district police desk",
      "the Supreme Court, which sits in New Delhi, is the top of the judicial pyramid.",
      "a market is not a court.",
      "the Rajya Sabha is a house of Parliament.",
      "a police desk is not the highest court.",
    ),
    row(
      "High Courts are",
      "the highest courts at the level of the states",
      "trading posts of the East India Company",
      "the same body as the Lok Sabha",
      "below every court and bound to ignore the Constitution",
      "each state has a High Court, though one High Court may serve more than one state.",
      "Company trading posts were called factories.",
      "the Lok Sabha is a house of Parliament.",
      "High Courts are not the lowest courts, and they uphold the Constitution.",
    ),
    row(
      "District courts belong to",
      "the subordinate courts that hear local cases",
      "the house that represents the states",
      "the group of factories on the Chotanagpur plateau",
      "the office that grants royal charters",
      "below the High Court, district and other subordinate courts try most local disputes and crimes.",
      "the house that represents the states is the Rajya Sabha.",
      "Chotanagpur is an industrial region, not a level of courts.",
      "royal charters were grants such as the Company's charter of 1600.",
    ),
    row(
      "India has an integrated judicial system. This means that",
      "the courts form one pyramid, and higher decisions bind the courts below",
      "each village has its own supreme court with no appeal",
      "the army is the final court",
      "there are no High Courts in the country",
      "an appeal can travel from a subordinate court to a High Court and then to the Supreme Court, and the law laid down above must be followed below.",
      "there is one national system, not a separate supreme court in every village.",
      "the army is not the court of final appeal.",
      "High Courts are part of the pyramid.",
    ),
    row(
      "A person who loses a case in a lower court may",
      "appeal to a higher court",
      "never be heard again under any law",
      "become the Prime Minister automatically",
      "cancel the Constitution",
      "the integrated system provides appeals so that a higher court can review the decision.",
      "the right of appeal exists. The loser is not silenced for ever.",
      "losing a case does not make anyone Prime Minister.",
      "an appeal does not cancel the Constitution.",
    ),
    row(
      "Public interest litigation lets a person",
      "approach a High Court or the Supreme Court about a public issue, not only a personal injury",
      "file a case only about his or her own private shop",
      "avoid every court",
      "punish someone without a hearing",
      "PIL widened access so that a public wrong could be raised even by someone who was not the direct victim. Sometimes a letter has been treated as a petition.",
      "a case only about one's own shop is an ordinary personal case, not the special point of PIL.",
      "PIL uses the courts. It does not avoid them.",
      "no one is punished without a hearing.",
    ),
    row(
      "PIL has been important because",
      "it helps a public wrong reach the court when the affected people cannot easily file themselves",
      "it stops poor people from ever seeing a judge",
      "it removes the need for any law",
      "it is a tax on salt",
      "groups and individuals have used PIL to raise issues that affect many people who lack the means to sue.",
      "PIL was meant to open the courts, not to close them to the poor.",
      "the court still applies the law.",
      "the salt tax belonged to the colonial salt law, not to PIL.",
    ),
    row(
      "An FIR is",
      "the first information of a cognizable offence recorded by the police",
      "a bill that has received the President's assent",
      "a diagram of age groups",
      "the charter of the East India Company",
      "FIR means First Information Report. It is the police record that a cognizable offence, a serious crime they can investigate, has been reported.",
      "a bill that has been assented to is an Act.",
      "a diagram of age groups is a population pyramid.",
      "the Company's charter dates from 1600.",
    ),
    row(
      "The FIR is given to",
      "the police",
      "the Speaker, as if it were a money bill",
      "the Drafting Committee of 1946",
      "a map-maker",
      "the information is lodged at a police station, and that starts the criminal investigation.",
      "the Speaker presides over the Lok Sabha and does not register crimes.",
      "the Drafting Committee wrote the Constitution.",
      "a map-maker draws maps and does not record offences.",
    ),
    row(
      "In a criminal trial the public prosecutor",
      "represents the state",
      "is the judge of the case",
      "represents only the private business of the accused",
      "is a soldier of the Meerut cantonment",
      "the public prosecutor conducts the case for the state, and the role begins after the police investigation.",
      "the judge is a different person and must stay neutral.",
      "the prosecutor does not act as the accused person's private lawyer.",
      "Meerut's soldiers belong to the story of 1857.",
    ),
    row(
      "During a trial the judge",
      "does not take sides and decides on the evidence and the law",
      "must support the police even when there is no evidence",
      "must acquit the accused even when the crime is proved",
      "leaves the verdict to a roadside crowd",
      "the judge hears both the prosecution and the defence and stays impartial.",
      "a verdict needs evidence. The police are not automatically right.",
      "a proved crime is not brushed aside. The judge applies the law to the proof.",
      "a crowd does not deliver the court's verdict.",
    ),
    row(
      "A criminal case deals with",
      "a crime against society, such as theft or assault",
      "only a private argument about the boundary of a field, with no crime",
      "the price list of a shopping complex",
      "the method of contour ploughing",
      "the state prosecutes a criminal case because the offence is treated as a wrong to society.",
      "a boundary quarrel with no crime is a civil dispute.",
      "a price list is not a criminal charge.",
      "contour ploughing is a farming method.",
    ),
    row(
      "A civil case deals with",
      "a dispute between persons, such as property or a contract",
      "a murder prosecuted by the state as a crime against society",
      "the grease said to be on the cartridges of 1857",
      "the royal charter of 1600",
      "in a civil case one party sues another, often for compensation or an order about a private right.",
      "murder is prosecuted as a criminal case.",
      "the cartridge dispute is part of the history of 1857.",
      "the charter of 1600 is the Company's grant from Queen Elizabeth I.",
    ),
    row(
      "An accused person is",
      "presumed innocent until the charge is proved",
      "treated as guilty the moment a neighbour complains",
      "denied any defence",
      "the same official as the judge",
      "the prosecution must prove guilt. Until then the accused is presumed innocent.",
      "a complaint is not itself a conviction.",
      "the accused has the right to defend the case.",
      "the judge is a neutral official, not the accused.",
    ),
    row(
      "The right to defend oneself means that the accused",
      "may have a lawyer and may challenge the evidence",
      "must stay silent while the police write the verdict",
      "is never told what the charge is",
      "is sentenced before any trial begins",
      "a fair trial includes knowing the charge, testing the evidence, and being represented.",
      "the police do not write the verdict. The judge does, after the trial.",
      "the charge has to be known so that a defence is possible.",
      "sentence comes after the trial, not before it.",
    ),
    row(
      "Which order of courts runs from the top downward?",
      "Supreme Court, High Courts, subordinate courts",
      "Subordinate courts, High Courts, Supreme Court",
      "Rajya Sabha, Lok Sabha, Supreme Court",
      "A district court, Parliament, a factory",
      "the Supreme Court is highest, then the High Courts, then the subordinate courts such as the district courts.",
      "that list is upside down.",
      "the two Houses are Parliament, not rungs of the judiciary.",
      "Parliament and a factory are not courts in this pyramid.",
    ),
    row(
      "The public prosecutor is expected to",
      "present the case fairly, because the aim is justice rather than a win at any cost",
      "hide evidence that would help the accused",
      "sit as the judge and also as the defence lawyer",
      "refuse to appear in every criminal case",
      "the prosecutor represents society and must act impartially, putting the full and fair case before the court.",
      "hiding helpful evidence would betray that duty.",
      "the prosecutor is neither the judge nor the defence lawyer.",
      "conducting the prosecution is the prosecutor's work.",
    ),
  ],
);

const marginalisation = topic(
  "t-marginalisation",
  "Marginalisation and public facilities",
  "NCERT Class 8 Social and Political Life, Chapters 7 to 9",
  "Marginalisation means being pushed to the edge of society, with weaker access to resources, respect, and rights. Many Adivasi communities have lost forests and land, and some Muslim communities have faced social and economic exclusion. Article 17 abolishes untouchability. The law against atrocities on Scheduled Castes and Scheduled Tribes punishes violence and humiliation, and manual scavenging is prohibited. Water, health care, sanitation, electricity, public transport, schools, and colleges are public facilities meant for everyone. The government must provide them, because a private company may not serve people who cannot pay. Equity means giving people what they need so they can stand as equals. The struggle over water in Chennai shows why a basic need cannot be left only to those who can buy it.",
  [
    row(
      "Marginalisation means that a community is",
      "pushed to the edge of society, with less access to resources and rights",
      "given every advantage in schools and jobs",
      "made the official religion of the state",
      "placed above all laws",
      "marginal groups have less power, less respect, and a weaker hold on resources and rights.",
      "being given every advantage is the opposite of the margin.",
      "marginalisation is not the same thing as becoming a state religion.",
      "marginal groups are not put above the law.",
    ),
    row(
      "Many Adivasi communities have been marginalised by",
      "the loss of land and forest to mines, dams, and harsh forest rules",
      "a gift of the best farmland with no displacement at all",
      "appointment as the only rulers of the East India Company",
      "a ban on every other person using a public road",
      "when forests are taken for mines, dams, or exclusive forest rules, Adivasi communities lose the land that sustained them.",
      "a secure gift of farmland would not be displacement.",
      "Adivasi communities did not rule the East India Company.",
      "a ban on other road users is not the history of their marginalisation.",
    ),
    row(
      "Adivasi communities of India are",
      "many different groups, with their own languages and traditions",
      "one single group with only one language and no traditions",
      "a kind of large-scale industry",
      "a house of Parliament",
      "there is no single Adivasi way of life. The communities are diverse, and many have been pushed to the margins.",
      "treating them as one group with no traditions erases that diversity.",
      "they are communities of people, not an industry.",
      "they are not a house of Parliament.",
    ),
    row(
      "The Class 8 textbook discusses marginalisation faced by",
      "Adivasi communities and some Muslim communities",
      "only the richest industrial families",
      "only the Viceroys",
      "no community in India",
      "the book looks at how Adivasis and some Muslims have had weaker access to resources, education, and fair treatment.",
      "the richest industrial families are not the marginal groups in this chapter.",
      "Viceroys held colonial power. They were not a marginalised community.",
      "the chapter is about real communities, not about nobody.",
    ),
    row(
      "The Sachar Committee is important in this chapter because it",
      "reported on the social, economic, and educational condition of Muslims in India",
      "wrote the royal charter of 1600",
      "commanded the sepoys at Meerut",
      "invented contour ploughing",
      "the committee, headed by Justice Rajinder Sachar, studied how Muslims lagged in areas such as literacy and work.",
      "the charter of 1600 belongs to the East India Company.",
      "Meerut is the start of the 1857 rising.",
      "contour ploughing is a method of farming on slopes.",
    ),
    row(
      "Article 17 of the Constitution",
      "abolishes untouchability",
      "creates the East India Company",
      "fixes the birth rate of a country",
      "partitions Bengal",
      "Article 17 says untouchability is abolished and its practice in any form is forbidden.",
      "the Company was chartered in 1600, not by Article 17.",
      "the birth rate is a population measure.",
      "Bengal was partitioned in 1905 by a colonial government.",
    ),
    row(
      "Practising untouchability is",
      "forbidden, and it is a punishable offence",
      "a Fundamental Right",
      "required in every government school",
      "a method of rainwater harvesting",
      "the Constitution forbids the practice, and the law can punish those who enforce it.",
      "Fundamental Rights include equality. They do not include untouchability.",
      "government schools must not practise untouchability.",
      "rainwater harvesting stores water. It is not this social practice.",
    ),
    row(
      "The Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act punishes",
      "violence and humiliation directed at members of those communities",
      "a child for attending school",
      "a farmer for ploughing along the contour",
      "a citizen for lodging an FIR",
      "the Act, passed in 1989, treats acts of violence, dishonour, and humiliation against Dalits and Adivasis as serious crimes.",
      "going to school is a right, not an atrocity.",
      "contour ploughing is soil conservation.",
      "lodging an FIR is how a cognizable offence is reported.",
    ),
    row(
      "Manual scavenging is",
      "prohibited by law",
      "a public honour",
      "listed as a Fundamental Right",
      "a recommended school subject",
      "carrying human waste by hand is banned. The law aims to end this degrading work.",
      "it is a humiliation, not an honour.",
      "no Fundamental Right requires this work.",
      "it is not a school subject.",
    ),
    row(
      "Seats reserved in education and government jobs for Scheduled Castes and Scheduled Tribes are meant to",
      "reduce a long history of exclusion and move towards equality",
      "punish those communities",
      "abolish the Constitution",
      "close public schools",
      "reservation is a constitutional step so that groups long kept out can enter education and public employment.",
      "the measure is for inclusion, not for punishment.",
      "it works inside the Constitution. It does not abolish it.",
      "the aim is wider access to schools, not their closure.",
    ),
    row(
      "Cultural and educational rights allow a minority to",
      "set up and run its own educational institutions",
      "be barred from every school",
      "lose the right to its language",
      "be forced into one official religion",
      "minorities may conserve their culture and establish educational institutions.",
      "the right opens schools. It does not bar minorities from them.",
      "language and culture are protected, not cancelled.",
      "there is no official religion into which people are forced.",
    ),
    row(
      "Which list is made up of public facilities?",
      "Water, health care, sanitation, electricity, public transport, schools, and colleges",
      "Only one family's locked private well",
      "Only luxury cars owned by a few households",
      "Only the palaces of former rulers",
      "these services meet basic needs and are meant to be available to the public.",
      "a locked private well is not a facility for everyone.",
      "luxury cars are private goods.",
      "palaces are not the public facilities this chapter discusses.",
    ),
    row(
      "The government must provide public facilities because",
      "a private company may not serve people who cannot pay",
      "private firms always supply the poor free of cost",
      "safe water is needed only by the rich",
      "the Constitution forbids public schools",
      "profit-seeking firms can skip poor areas, so the state has to arrange water, health, and schooling.",
      "private firms do not always serve the poor for free.",
      "safe water is a need of every person.",
      "the Constitution supports education. It does not forbid public schools.",
    ),
    row(
      "Equity means",
      "giving people what they need so that they can be equal",
      "giving identical things and ignoring very different needs",
      "helping only those who are already far ahead",
      "closing schools in the poorest neighbourhoods",
      "equity looks at unequal starting points and supplies what each person needs in order to stand equally.",
      "identical treatment can leave a disadvantaged person still behind.",
      "helping only the advantaged widens the gap.",
      "closing poor schools removes a facility people need.",
    ),
    row(
      "Chennai is used as an example of water because",
      "supply is unequal, and people who can pay often buy tankers while poorer areas get less",
      "every lane receives the same plentiful free supply and nobody is short",
      "the city has no use for water",
      "a water tanker is a type of soil",
      "the chapter shows that scarce municipal water pushes the poor into long waits while others purchase private tankers.",
      "the point of the example is shortage and unequal access, not plenty for all.",
      "a city cannot live without water.",
      "a tanker carries water. It is not soil.",
    ),
    row(
      "Safe water is linked to the right to life because",
      "a person cannot live with dignity without it",
      "water is a luxury with no link to life",
      "only factories need water",
      "the right to life forbids anyone to drink",
      "courts have read the right to life to include basic needs such as safe drinking water.",
      "water is a necessity, not a luxury.",
      "households need water, not factories alone.",
      "the right to life supports access to water. It does not forbid drinking.",
    ),
    row(
      "Sulabh is known for its work on",
      "sanitation, including low-cost toilets, and against manual scavenging",
      "the steel mills of Pittsburgh",
      "the Battle of Buxar",
      "drawing population pyramids",
      "Sulabh has built toilet facilities and has campaigned to end the degrading work of manual scavenging.",
      "Pittsburgh is a steel centre in the United States.",
      "Buxar was fought in 1764.",
      "population pyramids are diagrams of age groups.",
    ),
    row(
      "Public transport counts as a public facility because",
      "it lets people travel even when they cannot buy a private vehicle",
      "it is built for one wealthy family and locked to everyone else",
      "it removes the need for any road",
      "the right to travel means the state must give each citizen a private car",
      "buses and trains are shared services that widen mobility.",
      "a locked family vehicle is private, not public.",
      "public transport uses roads. It does not abolish them.",
      "the facility is shared transport, not a private car for each person.",
    ),
    row(
      "Government schools and colleges support equality when",
      "children who cannot pay high fees can still study",
      "they admit only the rich",
      "they are closed in every poor neighbourhood",
      "they refuse pupils from marginalised communities",
      "public education is a facility that should not depend on the ability to pay a high fee.",
      "admitting only the rich would deepen inequality.",
      "closing schools in poor areas withdraws the facility.",
      "refusing marginalised pupils is discrimination.",
    ),
    row(
      "Health care is treated as a public facility because",
      "illness does not wait until a person becomes rich",
      "the law must turn the poor away from every hospital",
      "health has no connection with the right to life",
      "a doctor is a kind of mineral ore",
      "public hospitals and health services exist so that treatment is not only for those who can pay.",
      "turning the poor away would deny a basic facility.",
      "health is closely tied to a life with dignity.",
      "a doctor is a person, not an ore.",
    ),
    row(
      "Sanitation is a public concern because",
      "unsafe waste spreads disease through a whole neighbourhood",
      "dirt never affects anyone beyond a single person",
      "the city must not think about toilets",
      "Sulabh worked to expand manual scavenging",
      "drains and toilets protect everyone's health, so sanitation cannot be left as a purely private matter.",
      "disease from waste travels beyond one household.",
      "toilets are a core public facility.",
      "Sulabh has worked against manual scavenging, not to expand it.",
    ),
    row(
      "When public facilities fail, marginalised groups are hurt more because",
      "they have less money to buy a private substitute",
      "they can buy private services more easily than the rich",
      "they do not need water or schools",
      "the market always serves them first",
      "without public provision, those who cannot pay are left without water, health care, or school.",
      "the rich, not the marginalised, find private substitutes easier to buy.",
      "water and schools are basic needs.",
      "the market often skips people who cannot pay.",
    ),
    row(
      "A private company may skip a poor neighbourhood because",
      "it may see little profit there",
      "profit never influences a private business",
      "the Constitution forbids government pipes and buses",
      "the law says the poor must be served and the rich ignored",
      "private firms follow paying customers, which is why the government has to provide basic facilities.",
      "profit is exactly why a private firm chooses its customers.",
      "the Constitution supports public facilities such as water and transport.",
      "equity does not mean ignoring the rich. It means the poor are not left out.",
    ),
    row(
      "Laws such as the Prevention of Atrocities Act matter because",
      "they give victims a legal way to challenge violence and humiliation",
      "they protect the person who commits the humiliation",
      "they cancel Article 17",
      "they make manual scavenging compulsory",
      "a clear offence and a punishment let people use the courts against caste violence.",
      "the Act is aimed at the offender, not at shielding the offender.",
      "Article 17, which abolishes untouchability, stands. The Act supports that promise.",
      "manual scavenging is prohibited, not made compulsory.",
    ),
  ],
);

const trade = topic(
  "t-trade",
  "From trade to territory",
  "NCERT Class 8 History, Chapter 2: From Trade to Territory",
  "The English East India Company began as a trader. In 1600 Queen Elizabeth I gave it a charter, the sole English right to trade with the East. It came to buy and sell, not to govern, and it competed with the Portuguese, the Dutch, and the French. A Company factory was a trading post, not a modern mill. At Plassey in 1757 Robert Clive defeated Siraj-ud-daulah, and Mir Jafar was made Nawab. Buxar in 1764 was a clearer victory, and in 1765 the Company received the Diwani, the right to collect Bengal's revenue. Lord Wellesley spread the subsidiary alliance. Lord Dalhousie's Doctrine of Lapse took states whose rulers died without a natural male heir. The Company ruled through the presidencies of Bengal, Madras, and Bombay. Warren Hastings was Governor-General.",
  [
    row(
      "In 1600 the East India Company received its charter from",
      "Queen Elizabeth I",
      "Bahadur Shah Zafar",
      "Tipu Sultan",
      "Dr B.R. Ambedkar",
      "Queen Elizabeth I granted the charter that let the Company trade with the East.",
      "Bahadur Shah Zafar was the Mughal emperor of the 1857 revolt, centuries later.",
      "Tipu Sultan of Mysore fought the Company. He did not grant the charter.",
      "Dr Ambedkar chaired the Drafting Committee in the twentieth century.",
    ),
    row(
      "The charter gave the Company",
      "the sole right among English traders to trade with the East",
      "the right to write the Indian Constitution",
      "the Diwani of Bengal in that same year",
      "command of the Indian National Army",
      "no other English trading group was to compete with the Company in the East.",
      "the Constitution was framed by the Constituent Assembly, not by this charter.",
      "the Diwani came in 1765, not in 1600.",
      "the Indian National Army was led by Subhas Chandra Bose in the 1940s.",
    ),
    row(
      "The Company first came to India in order to",
      "trade",
      "grant Fundamental Rights",
      "frame a republican constitution",
      "launch the Quit India Movement",
      "its early aim was commerce in goods such as cotton, silk, and spices, not the government of India.",
      "Fundamental Rights belong to the Constitution of independent India.",
      "the republican constitution came into effect in 1950.",
      "Quit India was Gandhi's movement of 1942.",
    ),
    row(
      "The Company's main European rivals in this story were",
      "the Portuguese, the Dutch, and the French",
      "the Indian National Congress and the Muslim League",
      "the Supreme Court and the High Courts",
      "Amul and the public-sector steel plants",
      "Portuguese, Dutch, and French companies were already competing for eastern trade.",
      "the Congress and the League are nationalist bodies of a much later period.",
      "the courts are institutions of the Indian judiciary.",
      "Amul and steel plants are modern industries.",
    ),
    row(
      "In the Company's language, a factory was",
      "a trading post where goods were stored and merchants worked",
      "a modern steel mill with a blast furnace",
      "a High Court",
      "a population pyramid",
      "the Company's 'factories' were warehouses and offices of its merchants, not manufacturing plants.",
      "a blast furnace belongs to an iron and steel industry.",
      "a High Court is a judicial body.",
      "a population pyramid shows age groups.",
    ),
    row(
      "The Battle of Plassey was fought in",
      "1757",
      "1764",
      "1857",
      "1600",
      "Plassey, in 1757, gave the Company its first great political foothold in Bengal.",
      "1764 is the year of the Battle of Buxar.",
      "1857 is the year of the great revolt.",
      "1600 is the year of the Company's charter.",
    ),
    row(
      "Siraj-ud-daulah was",
      "the Nawab of Bengal who was defeated at Plassey",
      "the first Viceroy of India",
      "Chairman of the Drafting Committee",
      "the leader of the Salt March",
      "Siraj-ud-daulah, Nawab of Bengal, lost Plassey to the Company.",
      "Lord Canning became the first Viceroy in 1858.",
      "Dr B.R. Ambedkar chaired the Drafting Committee.",
      "Gandhi led the Salt March in 1930.",
    ),
    row(
      "The Company's army at Plassey was led by",
      "Robert Clive",
      "Lord Dalhousie",
      "General Dyer",
      "Subhas Chandra Bose",
      "Robert Clive commanded the Company side, helped by the betrayal of Mir Jafar.",
      "Lord Dalhousie is linked with the Doctrine of Lapse in the nineteenth century.",
      "General Dyer ordered the firing at Jallianwala Bagh in 1919.",
      "Subhas Chandra Bose led the Indian National Army.",
    ),
    row(
      "After the victory at Plassey, the Company installed",
      "Mir Jafar as Nawab of Bengal",
      "Bahadur Shah Zafar as Viceroy",
      "Mahatma Gandhi as Governor-General",
      "Dr Ambedkar as Nawab",
      "Mir Jafar, who had sided with Clive, was placed on the throne of Bengal.",
      "Bahadur Shah Zafar was later exiled. He was never Viceroy.",
      "Gandhi was a nationalist leader, not a Governor-General.",
      "Dr Ambedkar drafted the Constitution. He was not a nawab.",
    ),
    row(
      "The Battle of Buxar was fought in",
      "1764",
      "1757",
      "1857",
      "1947",
      "Buxar, in 1764, was a decisive military defeat of the Indian alliance that opposed the Company.",
      "1757 is Plassey.",
      "1857 is the great revolt.",
      "1947 is Independence.",
    ),
    row(
      "At Buxar the Company defeated",
      "Mir Qasim, Shuja-ud-daulah of Awadh, and Shah Alam II",
      "only Tipu Sultan at Srirangapatna in 1799",
      "Rani Lakshmibai at Jhansi",
      "the Constituent Assembly",
      "Mir Qasim of Bengal, the Nawab of Awadh, and the Mughal emperor fought together and lost.",
      "Tipu Sultan died defending Srirangapatna in 1799, which is a different war.",
      "Rani Lakshmibai fought in the revolt of 1857.",
      "the Constituent Assembly met in the twentieth century.",
    ),
    row(
      "The Company received the Diwani of Bengal in",
      "1765",
      "1600",
      "1757",
      "1858",
      "in 1765 the Mughal emperor appointed the Company as Diwan, so it could collect the revenues of Bengal.",
      "1600 is the charter, not the Diwani.",
      "1757 is Plassey, which came before the grant of the Diwani.",
      "1858 is the year the Crown took over from the Company.",
    ),
    row(
      "Diwani means",
      "the right to collect land revenue",
      "a ban on religious signs in French state schools",
      "a diagram of age groups",
      "the chair of the Lok Sabha",
      "as Diwan, the Company collected the land revenue of Bengal, Bihar, and Orissa.",
      "the French school rule is about secularism, not revenue.",
      "a diagram of age groups is a population pyramid.",
      "the Speaker presides over the Lok Sabha.",
    ),
    row(
      "The Doctrine of Lapse is linked with",
      "Lord Dalhousie",
      "Queen Elizabeth I",
      "Mahatma Gandhi",
      "Dadabhai Naoroji",
      "Lord Dalhousie, Governor-General, used the doctrine to annex states in the mid-nineteenth century.",
      "Queen Elizabeth I granted the charter in 1600.",
      "Gandhi led the national movement in the twentieth century.",
      "Dadabhai Naoroji was a moderate Congress leader.",
    ),
    row(
      "Under the Doctrine of Lapse the Company could annex a state when",
      "the ruler died without a natural male heir",
      "the ruler had a living natural son",
      "the state joined the Indian National Congress",
      "the people adopted a democratic constitution",
      "an adopted son was not accepted as heir, so the state was said to 'lapse' to the Company.",
      "a natural son was exactly the heir the doctrine claimed to respect.",
      "the Congress was founded in 1885, after this policy.",
      "democratic constitutions are not what the doctrine was about.",
    ),
    row(
      "Awadh was taken by the Company in 1856",
      "on the charge of misgovernment, not under the Doctrine of Lapse",
      "under the Doctrine of Lapse, because its ruler had no natural son",
      "by the Salt March of 1930",
      "by the Cabinet Mission of 1946",
      "Dalhousie annexed Awadh in 1856 by accusing the Nawab of misrule. That is different from lapse for want of a natural heir.",
      "Awadh was not annexed by the Doctrine of Lapse.",
      "the Salt March was Gandhi's protest against the salt law.",
      "the Cabinet Mission came to discuss the transfer of power in 1946.",
    ),
    row(
      "Under a subsidiary alliance the Indian ruler",
      "had a Company army stationed in his territory and paid for it",
      "commanded the Company's army in London",
      "was free to hire any other European army he liked",
      "collected Bengal's Diwani for himself",
      "the ruler paid for the Company's troops, lost control of his own defence, and accepted a British Resident.",
      "the ruler did not command the Company's forces in London.",
      "he was forbidden to employ other Europeans without permission.",
      "the Diwani belonged to the Company after 1765, not to the allied ruler.",
    ),
    row(
      "A subsidiary alliance also required that the ruler",
      "keep no other European force and make no alliance without the Company's permission",
      "invite any European power he chose",
      "become the Governor-General",
      "chair the Drafting Committee",
      "the ruler had to cut himself off from other European advisers and from independent foreign ties.",
      "inviting other Europeans was precisely what the alliance forbade.",
      "the ruler did not become Governor-General.",
      "the Drafting Committee belonged to the Constituent Assembly.",
    ),
    row(
      "Lord Wellesley is remembered in this chapter for",
      "expanding the system of subsidiary alliances",
      "founding the Indian National Congress",
      "inscribing Ashoka's edicts",
      "leading the Dandi March",
      "as Governor-General he pressed many Indian rulers into subsidiary alliances.",
      "the Congress was founded in 1885.",
      "Ashoka's edicts were carved in ancient India.",
      "Gandhi began the Dandi March in 1930.",
    ),
    row(
      "Warren Hastings was",
      "the first Governor-General of Bengal",
      "the Nawab defeated at Plassey",
      "the first Prime Minister of independent India",
      "the author of the policy called sulh-i-kul",
      "under the Regulating Act of 1773, Warren Hastings became the first Governor-General of Bengal.",
      "Siraj-ud-daulah was the Nawab defeated at Plassey.",
      "Jawaharlal Nehru became the first Prime Minister in 1947.",
      "sulh-i-kul was Akbar's policy of peace with all.",
    ),
    row(
      "The three presidencies of the Company were",
      "Bengal, Madras, and Bombay",
      "Delhi, Kanpur, and Jhansi",
      "London, Paris, and Lisbon",
      "Nepal, Bhutan, and Myanmar",
      "each presidency had a Governor, and the Governor-General was the senior authority.",
      "Delhi, Kanpur, and Jhansi are centres of the 1857 revolt, not the three presidencies.",
      "London, Paris, and Lisbon are European cities.",
      "Nepal, Bhutan, and Myanmar are neighbouring countries.",
    ),
    row(
      "A Resident in this period was",
      "a Company official posted at an Indian ruler's court",
      "a judge of the Supreme Court",
      "an elected member of the Rajya Sabha",
      "a rainwater tank called a tanka",
      "the Resident watched the ruler and carried out the Company's political control.",
      "a Supreme Court judge belongs to the modern judiciary.",
      "Rajya Sabha members represent the states in Parliament.",
      "a tanka is a traditional tank for storing rainwater.",
    ),
    row(
      "Tipu Sultan of Mysore",
      "was killed in 1799 while resisting the Company",
      "granted the Company its charter in 1600",
      "chaired the Drafting Committee",
      "gave the Quit India call in 1942",
      "Tipu died defending his capital, Srirangapatna, in the Fourth Anglo-Mysore War.",
      "Queen Elizabeth I granted the charter.",
      "Dr Ambedkar chaired the Drafting Committee.",
      "Gandhi gave the call Do or Die in 1942.",
    ),
    row(
      "The Company's claim of paramountcy meant that",
      "its authority was supreme over the Indian states",
      "every Indian state was fully independent of it",
      "it would leave India in 1600",
      "it would give up the Diwani",
      "early in the nineteenth century Lord Hastings pressed this claim of supremacy. He is not the same person as Warren Hastings.",
      "paramountcy denied that the states were fully independent of the Company.",
      "1600 is when the Company arrived to trade, not when it left.",
      "the Diwani was a power the Company kept, not one it surrendered under this claim.",
    ),
  ],
);

const revolt1857 = topic(
  "t-1857",
  "The revolt of 1857",
  "NCERT Class 8 History, Chapter 5: When People Rebel",
  "The revolt of 1857 had deep causes and a sudden spark. Peasants and sepoys resented high taxes and the loss of land rights. Annexations, including Awadh in 1856, and the Doctrine of Lapse angered rulers and soldiers. New rifle cartridges, believed to be greased with cow and pig fat, hurt Hindu and Muslim feelings. Mangal Pandey resisted at Barrackpore. On 10 May 1857 sepoys at Meerut rose and marched to Delhi, where Bahadur Shah Zafar was proclaimed leader. Rani Lakshmibai, Nana Saheb, Tantia Tope, Begum Hazrat Mahal, and Kunwar Singh led the fight in their own regions. The British crushed the revolt by 1859. Bahadur Shah Zafar was exiled to Rangoon. In 1858 the Crown took India from the East India Company, and the Governor-General became the Viceroy.",
  [
    row(
      "One deep cause of the revolt was that peasants",
      "suffered from high taxes and the loss of rights in the land",
      "were freed from every tax",
      "were each made a nawab",
      "were given back every state the Company had annexed",
      "heavy revenue demands and the loss of customary land rights drove many peasants to rebel.",
      "taxes were high. They were not abolished.",
      "peasants were not made nawabs.",
      "annexations increased anger. They were not reversed before the revolt.",
    ),
    row(
      "The annexation of Awadh in 1856 caused anger because",
      "the Nawab was removed, and many soldiers and taluqdars lost their position",
      "Awadh was granted full independence",
      "the people had asked the British to annex it as a reward",
      "it was carried out by the Salt March",
      "many sepoys came from Awadh, and the fall of the Nawab and the taluqdars shook both the army and the countryside.",
      "annexation ended the Nawab's rule. It did not grant independence.",
      "the annexation was a British act, not a reward the people had sought.",
      "the Salt March took place in 1930.",
    ),
    row(
      "The new Enfield cartridges caused unrest because sepoys believed they were",
      "greased with the fat of cows and pigs",
      "made of hand-spun khadi",
      "a kind of Fundamental Right",
      "a cut in the land tax",
      "biting open cartridges greased with cow and pig fat would offend both Hindu and Muslim sepoys.",
      "khadi belongs to the later nationalist boycott of foreign cloth.",
      "a cartridge is not a Fundamental Right.",
      "the cartridges had nothing to do with lowering the land tax.",
    ),
    row(
      "Biting the ends of those cartridges was resented because it",
      "hurt the religious feelings of Hindu and Muslim soldiers",
      "was a harvest festival",
      "had been ordered by Bahadur Shah as a blessing",
      "used only coconut oil, which nobody minded",
      "the act of biting the greased paper seemed to force sepoys to break religious rules.",
      "it was a military order, not a festival.",
      "Bahadur Shah did not introduce the cartridges. He was later proclaimed leader of the revolt.",
      "the grievance was cow and pig fat, which both communities found offensive.",
    ),
    row(
      "The Doctrine of Lapse added to the anger because",
      "rulers lost their states when there was no natural male heir",
      "it restored every annexed kingdom",
      "it was a resolution of the Indian National Congress",
      "it guaranteed a pension to every adopted son",
      "Dalhousie refused to recognise adopted heirs, and states such as Jhansi were taken over.",
      "the doctrine annexed states. It did not restore them.",
      "the Congress was founded in 1885.",
      "adopted sons were refused, not guaranteed a pension.",
    ),
    row(
      "Nana Saheb had a grievance because the British",
      "refused him the pension they had paid to his adoptive father, Peshwa Baji Rao II",
      "crowned him Viceroy",
      "made him commander at the Battle of Plassey",
      "asked him to sign the Constitution of 1950",
      "Nana Saheb, the adopted son of the last Peshwa, was denied that pension and later led the revolt at Kanpur.",
      "he was never made Viceroy.",
      "Plassey was fought in 1757, long before he lived.",
      "the Constitution was adopted a century later.",
    ),
    row(
      "Mangal Pandey",
      "attacked his officers at Barrackpore in 1857 and was hanged",
      "led the Salt March from Sabarmati",
      "became the first Viceroy",
      "chaired the Drafting Committee",
      "in March 1857 Mangal Pandey, a sepoy at Barrackpore, turned on his officers. The wider rising began later at Meerut.",
      "Gandhi led the Salt March in 1930.",
      "Lord Canning became the first Viceroy.",
      "Dr Ambedkar chaired the Drafting Committee.",
    ),
    row(
      "The sepoy rising at Meerut began on",
      "10 May 1857",
      "23 June 1757",
      "13 April 1919",
      "15 August 1947",
      "on 10 May 1857 the sepoys at Meerut rose, freed their comrades, and marched to Delhi.",
      "23 June 1757 is the date of Plassey.",
      "13 April 1919 is Jallianwala Bagh.",
      "15 August 1947 is Independence Day.",
    ),
    row(
      "From Meerut the sepoys marched to",
      "Delhi",
      "London",
      "Dandi",
      "Rangoon, in order to crown a Viceroy there",
      "Delhi was the Mughal capital, and the sepoys went there to rally around Bahadur Shah Zafar.",
      "London was the British capital, not their destination.",
      "Dandi is where Gandhi broke the salt law in 1930.",
      "Rangoon was later the place of Bahadur Shah's exile, not the sepoys' march.",
    ),
    row(
      "In Delhi the rebels proclaimed as their leader",
      "Bahadur Shah Zafar",
      "Robert Clive",
      "Lord Canning",
      "Queen Elizabeth I",
      "the ageing Mughal emperor was declared the leader of the revolt.",
      "Robert Clive had led the Company at Plassey in 1757.",
      "Lord Canning was the British Governor-General, soon to be called Viceroy.",
      "Queen Elizabeth I had granted the Company's charter in 1600.",
    ),
    row(
      "Rani Lakshmibai led the revolt in",
      "Jhansi",
      "London",
      "the Constituent Assembly",
      "Osaka",
      "the Rani of Jhansi fought the British after her adopted son's claim was rejected under the Doctrine of Lapse.",
      "London was not the seat of her resistance.",
      "the Constituent Assembly met in the twentieth century.",
      "Osaka is a Japanese textile city.",
    ),
    row(
      "Nana Saheb was a leader of the revolt at",
      "Kanpur",
      "Jamshedpur",
      "Silicon Valley",
      "Amritsar in 1919",
      "Kanpur was the centre of Nana Saheb's rising.",
      "Jamshedpur is the steel city founded in 1907.",
      "Silicon Valley is an information-technology region in California.",
      "Amritsar in 1919 is the place and year of Jallianwala Bagh.",
    ),
    row(
      "Tantia Tope is remembered as",
      "a commander who fought alongside Nana Saheb",
      "the Governor-General who applied the Doctrine of Lapse",
      "President of the Constituent Assembly",
      "the founder of the Congress in 1885",
      "Tantia Tope was a skilled general of the rebel forces linked with Nana Saheb.",
      "Lord Dalhousie applied the Doctrine of Lapse.",
      "Dr Rajendra Prasad presided over the Constituent Assembly.",
      "the Congress was founded in 1885, with A.O. Hume among its organisers.",
    ),
    row(
      "Begum Hazrat Mahal led the revolt in",
      "Lucknow",
      "the Madras presidency as its Governor",
      "the Drafting Committee",
      "a French state school",
      "in Lucknow she took up the cause of Awadh after the annexation of 1856.",
      "she was not the Governor of Madras.",
      "the Drafting Committee wrote the Constitution.",
      "French state schools appear in the chapter on secularism.",
    ),
    row(
      "Kunwar Singh led the revolt in",
      "Bihar",
      "California",
      "the Rajya Sabha",
      "the Battle of Plassey",
      "Kunwar Singh, an old zamindar of Jagdishpur, led the rebels in Bihar.",
      "California is not the region of his campaign.",
      "the Rajya Sabha is a house of Parliament.",
      "Plassey was fought in 1757.",
    ),
    row(
      "The events of 1857 were wider than a mutiny of soldiers alone because",
      "peasants and some rulers also joined the rebellion",
      "only one sepoy in London took part",
      "no peasant was affected anywhere",
      "the Constituent Assembly had planned the rising",
      "the chapter shows a revolt of sepoys, peasants, and dispossessed rulers, not a soldiers' mutiny by itself.",
      "the rising was in India and involved large numbers, not one sepoy in London.",
      "peasants were deeply affected by taxes and the loss of land rights.",
      "the Constituent Assembly did not exist in 1857.",
    ),
    row(
      "The revolt did not cover every part of India. This means that",
      "some regions and some rulers did not join",
      "every state rose on the same morning",
      "the British left India in May 1857",
      "the fighting took place only in Europe",
      "the rising was strongest in parts of north and central India, and many rulers stayed out.",
      "it was not a single rising of every state.",
      "British rule continued, and the Crown took direct control in 1858.",
      "the fighting was in India, not only in Europe.",
    ),
    row(
      "The British had suppressed the revolt by",
      "1859",
      "1757",
      "1600",
      "1942",
      "by the end of 1859 the rebel centres had been defeated.",
      "1757 is the year of Plassey.",
      "1600 is the year of the Company's charter.",
      "1942 is the year of Quit India.",
    ),
    row(
      "After the revolt, Bahadur Shah Zafar was",
      "exiled to Rangoon",
      "made the first Viceroy",
      "appointed Chairman of the Drafting Committee",
      "left in command of the Company's army",
      "the British tried the emperor and sent him to Rangoon, where he later died.",
      "Lord Canning, not Bahadur Shah, became the first Viceroy.",
      "Dr Ambedkar chaired the Drafting Committee.",
      "he lost his throne. He was not left in command of the Company.",
    ),
    row(
      "In 1858 the government of India passed from the Company to",
      "the British Crown",
      "the Constituent Assembly",
      "the Indian National Congress",
      "the Muslim League",
      "the Crown took direct charge, ended Company rule, and promised to respect the rights of Indian princes.",
      "the Constituent Assembly met in the 1940s.",
      "the Congress was founded in 1885.",
      "the Muslim League was founded in 1906.",
    ),
    row(
      "After 1858 the Governor-General also received the title of",
      "Viceroy",
      "Diwan of a milk cooperative",
      "Speaker of the Lok Sabha",
      "public prosecutor",
      "the Governor-General, as the Crown's representative, was now called the Viceroy.",
      "a milk cooperative such as Amul has a chairperson, not this colonial title.",
      "the Speaker presides over the Lok Sabha.",
      "a public prosecutor represents the state in a criminal court.",
    ),
    row(
      "The first Viceroy of India was",
      "Lord Canning",
      "Robert Clive",
      "Warren Hastings",
      "Lord Mountbatten",
      "Lord Canning, already Governor-General during the revolt, became the first Viceroy in 1858.",
      "Robert Clive commanded the Company at Plassey.",
      "Warren Hastings was the first Governor-General of Bengal in the 1770s, long before the title Viceroy was used.",
      "Lord Mountbatten was the last Viceroy, at Independence in 1947.",
    ),
    row(
      "Jhansi had been annexed under the Doctrine of Lapse. That helps explain why",
      "Rani Lakshmibai had a deep grievance against the Company",
      "the Rani was the loyal Governor of Bombay",
      "Jhansi was never annexed",
      "the Rani wrote the Indian Constitution",
      "her adopted son was not recognised as heir, so Jhansi was taken, and she later fought in 1857.",
      "she was not Governor of Bombay.",
      "Jhansi was annexed. That is the grievance.",
      "the Constitution was framed by the Constituent Assembly.",
    ),
    row(
      "The cartridge dispute and the older grievances fit together because",
      "the cartridges sparked the rising, while taxes, land, and annexations had already built the anger",
      "there was no spark and no earlier cause",
      "the only cause was the founding of the Congress in 1885",
      "the only cause was the Rowlatt Act of 1919",
      "religious hurt over the cartridges set off a revolt whose roots lay in revenue policy and annexation.",
      "both a spark and deeper causes were present.",
      "the Congress did not yet exist in 1857.",
      "the Rowlatt Act came in 1919.",
    ),
  ],
);

const national = topic(
  "t-national",
  "National movement",
  "NCERT Class 8 History, Chapter 9: The Making of the National Movement",
  "The Indian National Congress was founded in 1885. Moderates such as Dadabhai Naoroji and Gopal Krishna Gokhale sought reform by petition. Tilak, Bipin Chandra Pal, and Lala Lajpat Rai wanted stronger action, and Tilak called swaraj his birthright. The 1905 partition of Bengal started the Swadeshi movement. Gandhi returned in 1915. The Rowlatt Act of 1919 allowed detention without trial. On 13 April 1919 General Dyer ordered firing at Jallianwala Bagh. Non-Cooperation boycotted schools, courts, and foreign cloth until Chauri Chaura turned violent and Gandhi called it off. The Salt March began on 12 March 1930. Quit India, in August 1942, used the call Do or Die. The Pakistan demand, the Cabinet Mission, and independence on 15 August 1947 ended British rule. Bose led the Indian National Army.",
  [
    row(
      "The Indian National Congress was founded in",
      "1885",
      "1757",
      "1857",
      "1942",
      "the Congress was formed in 1885, with its first session in Bombay and W.C. Bonnerjee as president. A.O. Hume helped to bring it together.",
      "1757 is the year of the Battle of Plassey.",
      "1857 is the year of the great revolt.",
      "1942 is the year of the Quit India Movement.",
    ),
    row(
      "Moderate leaders such as Dadabhai Naoroji and Gopal Krishna Gokhale",
      "asked for reforms through petitions, speeches, and resolutions",
      "refused to place any demand before the British",
      "led the sepoy rising at Meerut",
      "founded the East India Company",
      "the early moderates believed that reasoned petitions could persuade the British to grant reforms.",
      "they did place demands. The method was petition and argument.",
      "the Meerut rising was in 1857, before this phase of the Congress.",
      "the Company received its charter in 1600.",
    ),
    row(
      "Dadabhai Naoroji argued that",
      "India's wealth was being drained away to Britain",
      "India should have no trade of any kind with anyone",
      "the Doctrine of Lapse was a custom of Indian peasants",
      "satyagraha had begun in the year 1600",
      "his 'drain of wealth' argument said that British rule carried India's resources to Britain.",
      "he criticised the drain. He did not demand an end to all trade everywhere.",
      "the Doctrine of Lapse was Dalhousie's annexation policy.",
      "1600 is the Company's charter. Satyagraha is Gandhi's later method.",
    ),
    row(
      "Bal Gangadhar Tilak, Bipin Chandra Pal, and Lala Lajpat Rai were",
      "assertive leaders who wanted stronger action than petitions alone",
      "Viceroys of India",
      "opposed to every idea of swaraj",
      "commanders of the Company at the Battle of Buxar",
      "these assertive nationalists, often remembered together, pressed for swaraj rather than slow petitions.",
      "they were Indian leaders, not British Viceroys.",
      "they demanded swaraj. They did not oppose it.",
      "Buxar was fought in 1764.",
    ),
    row(
      "Tilak's famous declaration was that",
      "Swaraj is my birthright",
      "the Diwani is my birthright",
      "sulh-i-kul is my birthright",
      "the greased cartridge is my birthright",
      "Tilak said, 'Swaraj is my birthright and I shall have it.'",
      "the Diwani was the Company's right to collect Bengal's revenue.",
      "sulh-i-kul was Akbar's idea of peace with all.",
      "the greased cartridge was a cause of the 1857 revolt.",
    ),
    row(
      "Lord Curzon partitioned Bengal in",
      "1905",
      "1757",
      "1857",
      "1947",
      "the 1905 partition was officially called an administrative step, but nationalists saw it as a way to divide the people.",
      "1757 is Plassey.",
      "1857 is the great revolt.",
      "1947 is Independence, when Bengal was divided again in a different way. The Curzon partition was 1905.",
    ),
    row(
      "The Swadeshi movement called on people to",
      "boycott foreign goods and use goods made in India",
      "buy only British cloth",
      "close every Indian workshop",
      "support the partition of Bengal",
      "swadeshi meant 'of one's own country': spinning, Indian cloth, and a boycott of foreign imports.",
      "buying only British cloth was the opposite of the boycott.",
      "the movement wanted Indian workshops to grow, not to close.",
      "Swadeshi was a protest against the partition, not support for it.",
    ),
    row(
      "The partition of Bengal carried out in 1905 was annulled in",
      "1911",
      "1905",
      "1858",
      "1600",
      "the government cancelled that partition in 1911, though the Swadeshi upsurge had already changed nationalist politics.",
      "1905 is the year the partition was imposed, not the year it was cancelled.",
      "1858 is the year the Crown took over from the Company.",
      "1600 is the year of the Company's charter.",
    ),
    row(
      "Mahatma Gandhi returned to India from South Africa in",
      "1915",
      "1885",
      "1857",
      "1947",
      "he returned in 1915, bringing the method of satyagraha he had used in South Africa.",
      "1885 is the founding of the Congress.",
      "1857 is the great revolt.",
      "1947 is Independence.",
    ),
    row(
      "The Rowlatt Act of 1919",
      "allowed the government to detain people without trial",
      "granted the Diwani of Bengal",
      "abolished the tax on salt",
      "created the Supreme Court of India",
      "nationalists called it a black law because a person could be jailed without a normal trial.",
      "the Diwani was granted in 1765.",
      "the salt tax remained, and Gandhi later broke the salt law in 1930.",
      "the Supreme Court comes from the Constitution, not from the Rowlatt Act.",
    ),
    row(
      "On 13 April 1919 at Jallianwala Bagh in Amritsar",
      "General Dyer ordered troops to fire on a crowd",
      "Gandhi made salt and broke the salt law",
      "the Indian National Congress was founded",
      "the Crown took India over from the Company",
      "General Dyer blocked the exit of the bagh and fired on people who had gathered, killing and wounding hundreds.",
      "Gandhi broke the salt law at Dandi in April 1930.",
      "the Congress was founded in 1885.",
      "the Crown took over in 1858.",
    ),
    row(
      "The Non-Cooperation Movement of 1920 to 1922 called for a boycott of",
      "government schools, law courts, and foreign cloth",
      "khadi and the Indian spinning wheel",
      "every criticism of British rule",
      "the very idea of swaraj",
      "students, lawyers, and buyers were asked to withdraw from British institutions and foreign cloth, and to wear khadi.",
      "khadi was promoted, not boycotted.",
      "the movement depended on public criticism and withdrawal of cooperation.",
      "swaraj was the aim, not the thing being boycotted.",
    ),
    row(
      "Gandhi called off the Non-Cooperation Movement after",
      "the violence at Chauri Chaura",
      "the Battle of Plassey",
      "the grant of the charter in 1600",
      "a peaceful petition at Dandi in 1915",
      "in February 1922 a crowd at Chauri Chaura burned a police station and policemen were killed. Gandhi refused to lead a violent struggle.",
      "Plassey was fought in 1757.",
      "the charter of 1600 is the start of the Company's trade.",
      "Dandi and the salt law belong to 1930, and 1915 is the year Gandhi returned.",
    ),
    row(
      "The Salt March began on",
      "12 March 1930",
      "10 May 1857",
      "13 April 1919",
      "15 August 1947",
      "Gandhi set out from Sabarmati on 12 March 1930 and reached Dandi on 6 April, where he broke the salt law.",
      "10 May 1857 is the Meerut rising.",
      "13 April 1919 is Jallianwala Bagh.",
      "15 August 1947 is Independence Day.",
    ),
    row(
      "At Dandi, Gandhi broke the salt law. That law had",
      "stopped Indians from making salt and forced them to buy taxed salt",
      "given salt free to every household, with no control",
      "banned the Indian National Congress",
      "created the Rajya Sabha",
      "the government held a monopoly of salt and taxed it, so making salt was an offence.",
      "salt was not free. The tax and the monopoly were the grievance.",
      "the march did not ban the Congress. It was a Congress campaign.",
      "the Rajya Sabha is a house of Parliament under the Constitution.",
    ),
    row(
      "The Quit India Movement was launched in",
      "August 1942",
      "May 1857",
      "June 1757",
      "January 1915",
      "in August 1942 the Congress passed the Quit India resolution, and the leaders were soon arrested.",
      "May 1857 is the start of the great revolt.",
      "June 1757 is the month of Plassey.",
      "January 1915 is when Gandhi returned to India.",
    ),
    row(
      "Gandhi's call to the country in Quit India was",
      "Do or Die",
      "sulh-i-kul",
      "Diwani",
      "subsidiary alliance",
      "'Do or Die' meant that Indians should carry on the struggle until the British quit.",
      "sulh-i-kul was Akbar's policy of peace with all.",
      "Diwani was the right to collect land revenue.",
      "a subsidiary alliance was Wellesley's system for controlling Indian rulers.",
    ),
    row(
      "The Muslim League's major political demand in the 1940s was",
      "a separate state, Pakistan",
      "the revival of the Doctrine of Lapse",
      "a new subsidiary alliance with the Company",
      "the charter of 1600",
      "from the Lahore Resolution of 1940 the League, led by Muhammad Ali Jinnah, demanded separate Muslim states, later called Pakistan. The League itself had been founded in 1906.",
      "the Doctrine of Lapse was Dalhousie's nineteenth-century policy.",
      "subsidiary alliances belonged to the Company period.",
      "the charter of 1600 started the Company's trade.",
    ),
    row(
      "The Cabinet Mission of 1946 came to India to",
      "discuss how power would be transferred from British rule",
      "fight the Battle of Buxar",
      "carve Ashoka's edicts",
      "build the city of Mohenjo-daro",
      "the mission tried to plan a transfer of power. The Congress and the Muslim League could not keep to one shared plan, and partition followed.",
      "Buxar was fought in 1764.",
      "Ashoka's edicts were inscribed in ancient India.",
      "Mohenjo-daro is an Indus Valley city.",
    ),
    row(
      "India became independent on",
      "15 August 1947",
      "26 January 1950",
      "26 November 1949",
      "12 March 1930",
      "British rule ended on 15 August 1947, and the country was also partitioned.",
      "26 January 1950 is the day the Constitution came into effect, Republic Day.",
      "26 November 1949 is the day the Constituent Assembly adopted the Constitution.",
      "12 March 1930 is the start of the Salt March.",
    ),
    row(
      "Subhas Chandra Bose is remembered in the freedom struggle for",
      "leading the Indian National Army against British rule",
      "writing the Doctrine of Lapse",
      "ordering the firing at Jallianwala Bagh",
      "granting the Diwani in 1765",
      "Bose organised the Indian National Army, also called the Azad Hind Fauj, to fight British rule with the call to march to Delhi.",
      "the Doctrine of Lapse was Lord Dalhousie's policy.",
      "General Dyer ordered the Jallianwala Bagh firing.",
      "the Diwani was granted to the Company in 1765.",
    ),
    row(
      "The Viceroy associated with the partition of Bengal in 1905 is",
      "Lord Curzon",
      "Lord Canning",
      "Warren Hastings",
      "Robert Clive",
      "Curzon ordered the partition that set off the Swadeshi movement.",
      "Lord Canning was Viceroy at the time of the 1857 revolt and the Crown takeover.",
      "Warren Hastings was Governor-General in the late eighteenth century.",
      "Robert Clive led the Company at Plassey.",
    ),
    row(
      "Chauri Chaura changed the course of Non-Cooperation because",
      "a violent crowd burned a police station, and Gandhi would not lead a violent movement",
      "the crowd handed in a polite petition, which he thought too mild to continue",
      "the Congress was founded in that village in 1885",
      "the Company won the Battle of Buxar there",
      "Gandhi stopped the movement in 1922 because the killing at Chauri Chaura broke his condition of non-violence.",
      "he did not stop it for being too mild. He stopped it because it had turned violent.",
      "the Congress was founded in 1885 in Bombay, not at Chauri Chaura.",
      "Buxar was fought in 1764 in Bihar, not at Chauri Chaura.",
    ),
    row(
      "The breakdown of plans such as the Cabinet Mission mattered because",
      "the Congress and the Muslim League could not keep a shared plan, and partition came in 1947",
      "the talks restored the Mughal Empire under Babur",
      "they made Robert Clive the Prime Minister",
      "they cancelled the revolt of 1857",
      "without an agreed plan for a united India, independence arrived together with partition.",
      "Babur founded Mughal power in 1526. The Cabinet Mission did not restore him.",
      "Clive was an eighteenth-century Company commander, not Prime Minister.",
      "nothing in 1946 could cancel events of 1857.",
    ),
  ],
);

const facts = topic(
  "t-facts",
  "Class 6–7 fact drill",
  "NCERT Class 6 and 7 Social Science facts used in the RMS CET syllabus",
  "This drill mixes well-known facts from Classes 6 and 7. Harappa and Mohenjo-daro were cities of the Indus Valley. After the Kalinga war, Ashoka turned to dhamma and inscribed edicts on rocks and pillars. The Gupta period is often called a classical age of art and learning. The equator is 0°, the Tropic of Cancer is 23.5°N, and the Tropic of Capricorn is 23.5°S. Cancer crosses India. Democracy means rule by the people. A map scale compares map distance with ground distance. India has local, state, and union governments. People differ in language, faith, and custom, and unfair treatment of a group is discrimination. A weekly haat is unlike a shopping complex. The great Mughals run from Babur to Aurangzeb, and Akbar's sulh-i-kul meant peace with all.",
  [
    row(
      "Harappa and Mohenjo-daro were important cities of",
      "the Indus Valley civilisation",
      "the British Raj after 1858",
      "the Quit India Movement",
      "the Drafting Committee",
      "both were planned cities of the ancient civilisation that grew along the Indus and its tributaries.",
      "the British Raj began its Crown phase in 1858, thousands of years later.",
      "Quit India was a political movement of 1942.",
      "the Drafting Committee wrote the Indian Constitution.",
    ),
    row(
      "The Great Bath of that civilisation has been found at",
      "Mohenjo-daro",
      "the Red Fort in Delhi",
      "Jallianwala Bagh",
      "Sabarmati Ashram",
      "the Great Bath, a large lined tank, is one of the best-known structures at Mohenjo-daro.",
      "the Red Fort is a Mughal fort in Delhi.",
      "Jallianwala Bagh is the site of the 1919 firing in Amritsar.",
      "Sabarmati Ashram was Gandhi's ashram.",
    ),
    row(
      "A striking feature of Harappa and Mohenjo-daro was",
      "carefully planned streets and covered drains",
      "a total absence of bricks and of any streets",
      "steel mills of the kind started in 1907",
      "a railway built by the Tatas",
      "the cities used baked brick, straight streets, and drains, which show town planning.",
      "bricks, streets, and drains are exactly what archaeologists found.",
      "steel mills such as TISCO belong to the twentieth century.",
      "the Tata railway link at Jamshedpur is modern, not Harappan.",
    ),
    row(
      "The suffering caused by the Kalinga war led Ashoka to",
      "turn towards dhamma",
      "fight a fresh war of conquest every year",
      "join the East India Company",
      "partition Bengal",
      "Ashoka, the Mauryan emperor, was filled with sorrow after Kalinga and chose the path of dhamma.",
      "dhamma turned him away from further wars of conquest.",
      "the East India Company was founded in 1600.",
      "Bengal was partitioned in 1905.",
    ),
    row(
      "Ashoka spread his messages mainly by",
      "edicts carved on rocks and pillars",
      "printing them in daily newspapers",
      "secret letters to General Dyer",
      "the salt law of 1930",
      "his edicts, inscribed on rocks and pillars in places people could see, explained dhamma.",
      "newspapers did not exist in his time.",
      "General Dyer lived in the twentieth century.",
      "the salt law was a British monopoly that Gandhi broke in 1930.",
    ),
    row(
      "Ashoka's dhamma taught people to",
      "respect one another, avoid violence, and show tolerance",
      "plan further wars of conquest",
      "practise untouchability",
      "refuse every public duty",
      "dhamma asked for respect, non-violence, and tolerance among people of different beliefs.",
      "after Kalinga he turned away from conquest.",
      "untouchability is a later social evil abolished by the Constitution. It is not dhamma.",
      "dhamma included duties towards others, not a refusal of all duty.",
    ),
    row(
      "The Gupta period is often called",
      "a classical age of art and learning",
      "another name for the cities of the Indus Valley",
      "the same period as the revolt of 1857",
      "the age of the Quit India Movement",
      "under rulers such as Samudragupta and Chandragupta II, art, literature, and science flourished, so the age is often called classical.",
      "the Indus cities are much older than the Guptas.",
      "1857 is the nineteenth century, not the Gupta age.",
      "Quit India was in 1942.",
    ),
    row(
      "Which statement about these lines of latitude is correct?",
      "The equator is 0°, the Tropic of Cancer is 23.5°N, and the Tropic of Capricorn is 23.5°S",
      "The equator is 23.5°N, the Tropic of Cancer is 0°, and the Tropic of Capricorn is 23.5°S",
      "The equator is 0°, the Tropic of Cancer is 23.5°S, and the Tropic of Capricorn is 23.5°N",
      "The equator is 90°, the Tropic of Cancer is 0°, and the Tropic of Capricorn is 45°N",
      "the equator is the 0° line. Cancer lies 23.5° north of it, and Capricorn lies 23.5° south of it.",
      "the equator is not at 23.5°N, and Cancer is not at 0°.",
      "Cancer is the northern tropic and Capricorn is the southern tropic, not the other way round.",
      "90° is a pole, not the equator, and the tropics are not at 0° and 45°N.",
    ),
    row(
      "Which of these lines of latitude passes through India?",
      "The Tropic of Cancer",
      "The equator, through the middle of the country",
      "The Tropic of Capricorn",
      "The Arctic Circle",
      "the Tropic of Cancer, at 23.5°N, crosses India. The equator and the Tropic of Capricorn do not.",
      "the equator does not run through the middle of India.",
      "the Tropic of Capricorn is in the southern hemisphere and does not cross India.",
      "the Arctic Circle lies far to the north of India.",
    ),
    row(
      "Democracy means",
      "rule by the people",
      "rule by one king who answers to nobody",
      "rule by the army, with no elections",
      "rule by a single family, with no vote for anyone else",
      "in a democracy the people rule, usually by electing representatives. In India every adult citizen has a vote.",
      "an unanswerable king is personal rule, not democracy.",
      "army rule without elections is not rule by the people.",
      "locking the vote inside one family denies the people their rule.",
    ),
    row(
      "A scale on a map shows",
      "how a distance on the map compares with the real distance on the ground",
      "only the colour chosen for the oceans",
      "the name of the person who painted the map",
      "which political party is in office",
      "if the scale says 1 cm stands for 1 km, each centimetre on the map is one kilometre on the ground.",
      "ocean colour is a symbol, not the scale.",
      "the maker's name is not the scale.",
      "the party in office is politics, not a map scale.",
    ),
    row(
      "The three levels of government in India are",
      "local, state, and union",
      "only the union government, with no state and no local government",
      "the army, the navy, and the air force",
      "a district market, a private shop, and a weekly fair",
      "local bodies such as panchayats and municipalities, the state governments, and the union, or central, government share the work of governing.",
      "India has all three levels, not the union alone.",
      "the armed forces are not the three levels of government.",
      "markets and shops are places of trade, not levels of government.",
    ),
    row(
      "The gram sabha of a village is",
      "the body of adult voters who live in that village",
      "the Supreme Court of India",
      "the Rajya Sabha",
      "a multi-storey shopping complex",
      "every adult who has the right to vote can be part of the gram sabha. The gram panchayat is the council elected to carry out the village's work.",
      "the Supreme Court is the highest court.",
      "the Rajya Sabha represents the states in Parliament.",
      "a shopping complex is a market building.",
    ),
    row(
      "Diversity in a country such as India means that",
      "people differ in language, religion, food, and customs and still share one country",
      "everyone must follow one custom and speak only one language",
      "difference itself is a crime",
      "only one festival may ever be celebrated",
      "diversity is the variety of ways people live. It can be a strength when everyone is treated fairly.",
      "forcing one language and one custom would wipe out diversity.",
      "difference is not a crime.",
      "many festivals are part of that diversity.",
    ),
    row(
      "Discrimination means",
      "treating a person unfairly because of caste, religion, gender, or poverty",
      "giving every person the equal protection of the law",
      "the spinning of the Earth on its axis",
      "the scale printed on a map",
      "discrimination puts people at a disadvantage. It often follows prejudice, which is judging a group negatively without really knowing them.",
      "equal protection is the opposite of discrimination.",
      "the Earth's spin causes day and night.",
      "a map scale compares distances.",
    ),
    row(
      "A stereotype is",
      "a fixed idea that everyone in a group is the same",
      "a careful judgment made after knowing a person",
      "a Fundamental Right in the Constitution",
      "a line of latitude",
      "a stereotype ignores the differences among members of a group and sticks a single label on all of them.",
      "knowing a person and then judging is not a stereotype.",
      "a stereotype is not a constitutional right.",
      "a line of latitude is a geographic line such as the equator.",
    ),
    row(
      "A weekly haat is",
      "a market held on a fixed day, often with stalls that are not permanent",
      "a multi-storey building of permanent branded shops",
      "the upper house of Parliament",
      "a kind of fertile soil",
      "traders set up for the day, sell everyday goods, and often charge less because they do not pay for a large permanent shop.",
      "a multi-storey building of branded shops is a shopping complex.",
      "the upper house is the Rajya Sabha.",
      "fertile soil is a geographic resource, not a market.",
    ),
    row(
      "A shopping complex usually has",
      "permanent shops that sell branded goods at higher prices",
      "only temporary stalls set up for one morning in a village",
      "no goods of any kind for sale",
      "the Great Bath of Mohenjo-daro",
      "shopping complexes are city buildings with lasting shops, brands, and higher prices than a weekly haat.",
      "temporary one-morning stalls describe a weekly market, or haat.",
      "a complex exists in order to sell goods.",
      "the Great Bath is an ancient structure at Mohenjo-daro.",
    ),
    row(
      "Which list of early Mughal rulers is in the correct order?",
      "Babur, Humayun, Akbar",
      "Akbar, Babur, Humayun",
      "Humayun, Babur, Akbar",
      "Aurangzeb, Babur, Akbar",
      "Babur was followed by his son Humayun, and Humayun by Akbar.",
      "Akbar came after Humayun, not before Babur.",
      "Humayun did not rule before Babur.",
      "Aurangzeb was the last of these six great Mughals, not the first.",
    ),
    row(
      "Which list of later Mughal rulers is in the correct order?",
      "Jahangir, Shah Jahan, Aurangzeb",
      "Aurangzeb, Jahangir, Shah Jahan",
      "Shah Jahan, Aurangzeb, Jahangir",
      "Jahangir, Aurangzeb, Shah Jahan",
      "Akbar's successor was Jahangir, then Shah Jahan, then Aurangzeb.",
      "Aurangzeb came last, not first, in this trio.",
      "Shah Jahan ruled before Aurangzeb, and Jahangir ruled before Shah Jahan.",
      "Aurangzeb followed Shah Jahan. He did not come between Jahangir and Shah Jahan.",
    ),
    row(
      "Babur laid the foundation of Mughal power in India when he",
      "defeated Ibrahim Lodi at Panipat in 1526",
      "defeated the British at Plassey in 1757",
      "chaired the Drafting Committee",
      "led the Salt March",
      "the First Battle of Panipat, in 1526, was Babur's victory over Ibrahim Lodi, the Sultan of Delhi.",
      "Plassey was Clive's victory in 1757.",
      "Dr Ambedkar chaired the Drafting Committee.",
      "Gandhi led the Salt March in 1930.",
    ),
    row(
      "Akbar's policy of sulh-i-kul means",
      "universal peace, and tolerance among religions",
      "the Doctrine of Lapse",
      "the tax on salt broken at Dandi",
      "the partition of Bengal",
      "sulh-i-kul, or peace with all, was Akbar's idea that the state should not discriminate among religions.",
      "the Doctrine of Lapse was Lord Dalhousie's annexation rule.",
      "the salt tax was a British monopoly that Gandhi challenged in 1930.",
      "Bengal was partitioned in 1905.",
    ),
    row(
      "Day and night are caused by",
      "the Earth rotating on its axis",
      "the Earth revolving once around the Sun",
      "a change in the scale of a map",
      "the migration of people from villages to cities",
      "one rotation takes about 24 hours and brings each place into daylight and then into darkness.",
      "revolution around the Sun marks the year and, with the tilt of the axis, the seasons.",
      "a map scale only compares distances.",
      "migration changes where people live. It does not cause day and night.",
    ),
    row(
      "Shah Jahan is especially remembered for building",
      "the Taj Mahal",
      "the Great Bath at Mohenjo-daro",
      "the fort at the Battle of Buxar",
      "the police report called an FIR",
      "Shah Jahan built the Taj Mahal at Agra in memory of Mumtaz Mahal.",
      "the Great Bath belongs to the Indus city of Mohenjo-daro.",
      "Buxar was a battle in 1764, not a building of Shah Jahan.",
      "an FIR is the first information of a cognizable offence given to the police.",
    ),
  ],
);

export const topics = [
  resources,
  land,
  agriculture,
  industries,
  population,
  constitution,
  secularism,
  parliament,
  judiciary,
  marginalisation,
  trade,
  revolt1857,
  national,
  facts,
];
