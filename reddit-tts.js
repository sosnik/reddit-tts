/****************************************************************************
   Copyright 2018 Nikita Sosnik

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
****************************************************************************/

console.info("[reddit-tts] Extension loaded...")
console.info(`[reddit-tts] jQuery is ${typeof(window.jQuery)} and tts is ${typeof(window.speechSynthesis)}`)

// constants
const SPEAKBTNCLASS = "speakbtn"
const SPEAKBTNTEXT = "Read this text"
const synth = window.speechSynthesis;

let readable = $('.md') //document.getElementsByClassName('md');

for (i = 0; i < readable.length; i++) {
  let speakbtn = document.createElement("button");
  speakbtn.innerHTML = SPEAKBTNTEXT;
  speakbtn.setAttribute('class',SPEAKBTNCLASS)
  readable[i].appendChild(speakbtn);
}

console.info(`[reddit-tts] ` + $(`.${SPEAKBTNCLASS}`).length +  ` controls were created.`)

$(`.${SPEAKBTNCLASS}`).on('click', function() {
	// clone() the current element so we don't break the page when we remove() the button
	var texttoread = $(this).parent().clone()
	texttoread.find("button").remove()
	texttoread = texttoread.text()
	// If for whatever dumb reason you can't find() the child button elements,
	// uncomment the next line to perform text replacement
	//texttoread = texttoread.replace(new RegExp(SPEAKBTNTEXT, "g"),"");
    console.log(`[reddit-tts] Reading ${typeof(texttoread)}, ${texttoread.length} characters: \n ${texttoread}`)

    let utterThis = new SpeechSynthesisUtterance(texttoread);
    synth.speak(utterThis);
})
