let typhoon_origin;
let typhoon_data;
let i;
let buttonPage_total;
let buttonPage;
let buttonPage_add = 6;
let everyPage_results = 6;
let current_page;
let click_page;

$.ajax({
  url: "https://next.json-generator.com/api/json/get/Ek86hdRMr",
  cache: false,
  success: function(res) {
    
    typhoon_origin = res;
    
    typhoon_data = typhoon_origin;
    
   
    common_result();
    initial_selOpt();
    
    $("button[data-num='1']").addClass("active");
  }
});

function initial_selOpt() {
  
  let dists = [];
  typhoon_data.forEach(function(el, id){
    dists[id] = el.CaseLocationDistrict;
  });
  
  let dists_notRepeat = dists.filter(function(dist, id, arr){
    return arr.indexOf(dist) === id;
  });
  
  dists_notRepeat.forEach(function(dist){
    let selOpt_html = `<li>${dist}</li>`;
    $(".select__option.dist").append(selOpt_html);
  });
  
  let typies = [];
  typhoon_data.forEach(function(el, id){
    typies[id] = el.PName;
  });
  
  let typies_notRepeat = typies.filter(function(type, id, arr){
    return arr.indexOf(type) === id;
  });
  
  typies_notRepeat.forEach(function(type){
    let selOpt_html = `<li>${type}</li>`;
    $(".select__option.type").append(selOpt_html);
  });
  
}



function clickPage_result() {
  
  
  $(".search-result").empty();
  
  
  i = (click_page - 1) * everyPage_results;
  
  
  for(i; i < (click_page * everyPage_results > typhoon_data.length ? typhoon_data.length : click_page * everyPage_results); i++) {
    
    let result_html = `
      <div>
        <article>
          <section class="search-result__time">
            <div class="title">發生時間：</div>
            <p>${typhoon_data[i].CaseTime.replace("T", " ")}</p>
          </section>
          <section class="search-result__dist">
            <div class="title">受災地區：</div>
            <p>${typhoon_data[i].CaseLocationDistrict}</p>
          </section>
          <section class="search-result__type">
            <div class="title">災害類型：</div>
            <p>${typhoon_data[i].PName}</p>
          </section>
          <section class="search-result__address">
            <div class="title">詳細地址：</div>
            <p>${typhoon_data[i].CaseLocationDescription}</p>
          </section>
          <section class="search-result__desc">
            <div class="title">災情描述：</div>
            <p>${typhoon_data[i].CaseDescription}</p>
          </section>
          <div class="complete ${typhoon_data[i].CaseComplete === true ? "yes" : ""}"></div>
          <i class="fas fa-arrow-up"></i>
        </article>
      </div>
    `;
    
    $(".search-result").append(result_html);
  }
  
  if($(window).width() < 620)
    $(window).scrollTop(472);
  else
    $(window).scrollTop(212);
}



function common_result() {

  $(".search-result").empty();
  $("button[data-num]").remove();
  $(".search-info__summary span").text(typhoon_data.length);

  setTimeout(function() {

    
    for (
      i = 0;
      i <
      (typhoon_data.length > everyPage_results
       ? everyPage_results
       : typhoon_data.length);
      i++
    ) {
      let result_html = `
        <div>
          <article>
            <section class="search-result__time">
              <div class="title">發生時間：</div>
              <p>${typhoon_data[i].CaseTime.replace("T", " ")}</p>
            </section>
            <section class="search-result__dist">
              <div class="title">受災地區：</div>
              <p>${typhoon_data[i].CaseLocationDistrict}</p>
            </section>
            <section class="search-result__type">
              <div class="title">災害類型：</div>
              <p>${typhoon_data[i].PName}</p>
            </section>
            <section class="search-result__address">
              <div class="title">詳細地址：</div>
              <p>${typhoon_data[i].CaseLocationDescription}</p>
            </section>
            <section class="search-result__desc">
              <div class="title">災情描述：</div>
              <p>${typhoon_data[i].CaseDescription}</p>
            </section>
            <div class="complete ${
                  typhoon_data[i].CaseComplete === true ? "yes" : ""
                  }"></div>
            <i class="fas fa-arrow-up"></i>
          </article>
        </div>
      `;

      $(".search-result").append(result_html);
    }

    
    buttonPage_total = Math.ceil(typhoon_data.length / everyPage_results);

   
    for (
      buttonPage = 0;
      buttonPage <
      (buttonPage_total >= buttonPage_add ? buttonPage_add : buttonPage_total);
      buttonPage++
    ) {
      let button_html = `
<button data-num="${buttonPage + 1}">${buttonPage + 1}</button>
`;
      $("button.next").before(button_html);

      $("button[data-num='1']").addClass("active");

      $("button.prev").addClass("disabled");

      if (buttonPage_total === 0 || buttonPage_total === 1)
        $("button.next").addClass("disabled");
      else $("button.next").removeClass("disabled");
    }
  }, 100);
}


$(".select__option").on("click", "li", function() {
  
  let selDisplay = $(this).parent().prev();

  selDisplay.text($(this).text());
  
  $(this).siblings(".active").removeClass("active");
  $(this).addClass("active");
  
  $(this).parent().addClass("hide");
  
  
  let selDist = $(".select__display.dist").text();
  let selType = $(".select__display.type").text();
  let selComplete = $(".select__display.complete").text(); 
  

  typhoon_data = typhoon_origin.filter(function(item) {
    if (selDist !== "所有受災地區") {
      return item.CaseLocationDistrict === selDist;
    } else {
     
      return typhoon_origin;
    }
  });

  typhoon_data = typhoon_data.filter(function(item) {
    if (selType !== "- 請選擇災害類型 -" && selType !== "所有災害類型") {
      return item.PName === selType;
    } else {
      
      return typhoon_data;
    }
  });
  
  
  typhoon_data = typhoon_data.filter(function(item) {
    
    if (selComplete !== "- 請選擇是否完成 -" && selComplete !== "無") {
      
      
      return (
        item.CaseComplete === (selComplete === "已經處理完成" ? true : false)
      );
    } else {
      
      
      return typhoon_data;
    }
  });
  
  common_result();
});

$(document).click(function(evt){
  
  let selOpt = $(evt.target).next();
  
  if(!selOpt.hasClass("hide")){
    $(".select__option").addClass("hide");
    $(".select__display").removeClass("rotate")
  } else {
    $(".select__option").addClass("hide");
    selOpt.removeClass("hide");
    $(".select__display").removeClass("rotate")
    $(evt.target).addClass("rotate")
  }
  
});

$(".select__option.type, .select__option.complete").one("click", "li", function() {
    $(this).parent().prev().removeClass("placeholder");
  }
);



function buttonPages_next() {
  
  
  $("button[data-num]").remove();
  
  for (
    buttonPage;
    buttonPage <
    (current_page + buttonPage_add > buttonPage_total ? buttonPage_total : current_page + buttonPage_add);
    buttonPage++
  ) {
    let button_html = `
      <button data-num="${buttonPage + 1}">${buttonPage + 1}</button>
    `;
    $("button.next").before(button_html);
  }

  $(`button[data-num="${current_page + 1}"]`).addClass("active");
  click_page = $("button.active").data("num");
  
  if(click_page===buttonPage_total)
    $("button.next").addClass("disabled");
  else
    $("button.next").removeClass("disabled")
    
  clickPage_result();
}



function buttonPages_prev() {
  
  $("button[data-num]").remove();
  
  let buttonPage_endRemain = buttonPage_total % buttonPage_add;
  
  buttonPage =
    buttonPage === buttonPage_total
    ? buttonPage - (buttonPage_add + buttonPage_endRemain)
  : buttonPage - (buttonPage_add * 2);
  
  for (buttonPage; buttonPage < (current_page - 1); buttonPage++) {
    let button_html = `
      <button data-num="${buttonPage + 1}">${buttonPage + 1}</button>
    `;
    $("button.next").before(button_html);
  }
  
  $(`button[data-num="${current_page - 1}"]`).addClass("active");
  
  click_page = $("button.active").data("num");
  
  clickPage_result();
  
}



$(".pagination").on("click", "button:not(.prev, .next)", function() {
  
  current_page = $("button.active").data("num");
  click_page = $(this).data("num");
  
  $("button").removeClass("active");
  $(this).addClass("active");
  
  if ($(this).data("num") === 1)
    $("button.prev").addClass("disabled");
  else
    $("button.prev").removeClass("disabled");

  if ($(this).data("num") === buttonPage_total)
    $("button.next").addClass("disabled");
  else
    $("button.next").removeClass("disabled");

  
  clickPage_result();
});



$("button.prev, button.next").click(function() {
  
  current_page = $("button.active").data("num");

  if ($(this).hasClass("next")) {
    
    if (buttonPage_total !== 0 && buttonPage_total !== 1)
      $("button.prev").removeClass("disabled");
    
    if (current_page === buttonPage_total) return;

    if ($("button.active").index() === buttonPage_add) {
      buttonPages_next();

    } else {

      $("button.active").removeClass("active")
        .next().addClass("active");
      click_page = $("button.active").data("num");
      if(click_page === buttonPage_total)
        $("button.next").addClass("disabled");
      
      clickPage_result();
    }

  } else if ($(this).hasClass("prev")) {
    
    if (buttonPage_total !== 0 && buttonPage_total !== 1)
      $("button.next").removeClass("disabled");
    
    if($("button.active").text() === "1") return;
    
    if($("button.active").index() === 1){

      buttonPages_prev();
      
    } else {
      
      $("button.active").removeClass("active")
        .prev().addClass("active");
      
      click_page = $("button.active").data("num");
      
      if(click_page === 1)
        $(this).addClass("disabled");
      
      clickPage_result(); 
    }
  }
});


$("nav h1:nth-child(1)").click(function() {
  location = location; 
});

$(".search-result").on("click", ".fa-arrow-up", function() {
  console.log("hi");
  $("html, body").animate(
    {
      scrollTop: 0
    },
    400
  );
});

$(".search-info__display .num").click(function(){
  everyPage_results = $(this).text();
  
  $("span.num").removeClass("active");
  $(this).addClass("active");
  
  common_result();
  
});


