$('.edit').click(function(){
  var id=$(this).attr('id');
  console.log(id);
  var innerText=$('#'+id).text();
  console.log(innerText);
  var value=innerText.split('\n')[2].split(' ').join(' ').trim();
  console.log('value : ',value);
  var idName=innerText.split('\n')[2].split(' ').join('');
  console.log(idName);
  $('#'+id).addClass('hidden');
  $('.'+idName).attr('value',value);
  //$('.'+idName).css('text-align','left');
  $('#'+idName).removeClass('hidden');
});

$('.add-button').click(function(){
  var id=$(this).attr('id');
  console.log(id);
  $('.'+id).removeClass('hidden');
  $(this).css('display','none');
});
