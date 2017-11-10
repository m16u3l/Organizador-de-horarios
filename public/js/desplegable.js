/*$(function () {

  $('.mini-submenu').show();

  $('#slide-submenu').on('click', function () {
    $(this).closest('.list-group').toggle('slide', function () {
      $('.mini-submenu').fadeIn();
    });

  });
})
*/

function openLeftMenu() {
  $('#leftMenu').toggle('slide');
  document.getElementById("rightMenu").style.display = "none";
}
function closeLeftMenu() {
  $('#leftMenu').toggle('slide');
}

function openRightMenu() {
  $('#rightMenu').toggle('slide');
  document.getElementById("leftMenu").style.display = "none";
}
function closeRightMenu() {
  $('#rightMenu').toggle('slide');
}