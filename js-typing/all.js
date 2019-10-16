const data = [
    {
      AboutDevTypeText: "<span>About Dev Quest<br/><br/>Do you want to go on an epic quest to uncover the magic of coding? Seize the chance to learn about web development and get a scholarship or an internship.</span><br/><br/><br/><span>Are you a developer?<br/> Y / N</span><br/>"
    }
  ];
  
  const allElements = document.getElementsByClassName("typeing");
  for (let j = 0; j < allElements.length; j++) {
    const currentElementId = allElements[j].id;
    const currentElementIdContent = data[0][currentElementId];
    const element = document.getElementById(currentElementId);
    const devTypeText = currentElementIdContent;
  
    // type code
    let i = 0; 
    let isTag; 
    let text;
    
    (function type() {
      text = devTypeText.slice(0, ++i);
      if (text === devTypeText) return;
      element.innerHTML = text + `<span class='blinker'>&#32;</span>`;
      const char = text.slice(-1);
      if (char === "<") isTag = true;
      if (char === ">") isTag = false;
      if (isTag) return type();
      setTimeout(type, 60);
    })();
  }
  