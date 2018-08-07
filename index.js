const CORS = 'https://cors-anywhere.herokuapp.com/';

const Cannabis_URL2 = 'http://strainapi.evanbusse.com/vVo5aEm/strains/search/effect/';

const Name_URL = 'http://strainapi.evanbusse.com/vVo5aEm/strains/data/effects/'

let modalOpen = false;

function cannabisEffect(){
  $('.submit-effect').on('click', function(e){
    e.preventDefault();
    // const infoInput = $(this).text();
    // console.log(infoInput);
    cannabisResult($(this).text());
  })
}

function cannabisResult(infoInput){
  $.ajax({
    url: CORS + Cannabis_URL2 + infoInput,
    datatype: 'json',
    type: 'GET'
  })
  .done(function(data){
    // console.log('successful');
    dataShowcase(data);
  })
  .fail(function(xhr, status, errorThrown){
    alert('This process has been failed');
    console.log('status: ' + status);
    console.log('error: ' + errorThrown);
    console.log(xhr);
  })
}

function dataShowcase(data){
  const results = data.map(obj => {
    return `
      <li class='effect-result-item' data-attr=${obj.id}>
        ※ <span class='effect-name'>${obj.name}</span> |
        <span class='effect-race'>${obj.race}</span> ※
      </li>`;
  })
  $('.effect-results').html(results);
}

function openModal() {
  $('#mainResult').on('click', '.effect-result-item', function() {
    // const id = $(this).attr('data-attr');
    // const name = $(this).find('.effect-name').text();
    // console.log('name ' + name);
    // console.log('id: ' + id);
    getAPIidResult($(this).attr('data-attr'), $(this).find('.effect-name').text());
  })
}

function getAPIidResult(idInput, idName){
  console.log('idinput: ' + idInput + ' idname: ' + idName)
  $.ajax({
    url: CORS + Name_URL + idInput,
    datatype: 'json',
    type: 'GET'
  })
  .done(function(data){
    // console.log('sucessful ' + idInput);
    idShowcase(data, idName);
  })
  .fail(function(xhr, status, errorThrown){
    alert('This process has been failed');
    console.log('status: ' + status);
    console.log('error: ' + errorThrown);
    console.log(xhr);
  })
}

function bindEventListeners() {
  openModal();
  closeModal();
}

function idShowcase(data2, name){
  console.log('data2: ' + JSON.stringify(data2));
  $('#container-ExtraInfo').html(`<div id='CannabisExtraInfo'>Extra information about the ${name} strain's effects. On Medical part: The strain that you selected is a good match to nullfy/minimize them. <ul class='id-result'></ul></div>`);
  const idResult = Object.keys(data2).map(key => {
    const result = data2[key].join(', ');
    return result ? `<li class='id-result-list'>
      ${key}: ${result}
    </li>` : '';
  })
  modalOpen = true;
  $('.id-result').html(idResult);
}

function closeModal(){
  $('body').on('click', function(){
    if (modalOpen === true) {
      $('#CannabisExtraInfo').remove();
      modalOpen = false;
    }
  })
}

$(bindEventListeners);
$(cannabisEffect);
