$(document).ready(function() {

	var myVivus = new Vivus('Layer_1', {type: 'oneByOne', duration: 200}); 
  var myVivus = new Vivus('Layer_2', {type: 'oneByOne', duration: 200}); 
  var myVivus = new Vivus('Layer_3', {type: 'oneByOne', duration: 200}); 
  var myVivus = new Vivus('Layer_4', {type: 'oneByOne', duration: 200}); 
  // myVivus.play();
  $('.btn_fix').on('click', function(){
    myVivus.reset().play();
  });

  $("a.modall_pad").fancybox({
    padding: 0,
    margin: 0
  });

  $('.owl-carousel1').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    navText: ['<img src="img/left.png" alt="">','<img src="img/right.png" alt="">'],
    items:1
  });

  var owl2 = $(".owl-carousel2").owlCarousel({
    items: 1,
    dots: true,
    dotsData: true
  });

  $('body').on('touchend', '.owl-carousel2 .owl-dot', function(){
    owl2.trigger('to.owl.carousel', $(this).index());
  })


  // drop down the menu, and swap the icon to the close icon
  $('.menu').click(function(){
    $(this).toggleClass('icon-menu');
    $(this).toggleClass('icon-cross');
    $('nav').toggleClass('down');
    $('nav li a').removeClass('down');
    $('.search').removeClass('down');
    $('.icon-search').removeClass('icon-cross');
  });

  //Make sure the menu icon behaves corectly when the menu is open
  $('nav li a').click(function(){
      $('.menu').addClass('icon-menu');
      $('.menu').removeClass('icon-cross');
      $('nav').toggleClass('down');
  });

  //show and hide the search bar, also make sure if the menu is open to hide the menu, and ensure the menu icon state is correct
  $('.icon-search').click(function(){
      $(this).toggleClass('icon-cross');
      $('.menu').addClass('icon-menu');
      $('.menu').removeClass('icon-cross');
      $('.search').toggleClass('down');
      $('nav').removeClass('down');
  });

$(document).ready(function(){
  $(".nav").on("click","a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = $(this).attr('href'),

    //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;
    if($(window).scrollTop()>top){
      top = top - 5;
    }
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 1500);
  });
});

$(document).ready(function(){
  $(".logo").on("click","a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = $(this).attr('href'),

    //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;
    if($(window).scrollTop()>top){
      top = top - 5;
    }
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 1500);
  });
});

 $(function() { 
        $('#sec2').waypoint( 
            function() {
              $("li a").removeClass("active1");
              $('#act1').addClass('active1');

            }
        )
    });
 $(function() { 
        $('#sec3').waypoint( 
            function() {
              $("li a").removeClass("active1");
              $('#act2').addClass('active1');

            }
        )
    });
 $(function() { 
        $('#sec4').waypoint( 
            function() {
              $("li a").removeClass("active1");
              $('#act3').addClass('active1');

            }
        )
    });
 $(function() { 
        $('#sec5').waypoint( 
            function() {
              $("li a").removeClass("active1");
              $('#act4').addClass('active1');

            }
        )
    });
 $(function() { 
        $('#sec6').waypoint( 
            function() {
              $("li a").removeClass("active1");
              $('#act5').addClass('active1');

            }
        )
    });
 $(function() { 
        $('#sec7').waypoint( 
            function() {
              $("li a").removeClass("active1");
              $('#act6').addClass('active1');

            }
        )
    });

  
$('body').on('click', '.btn_order', function(){
  var title = $(this).attr('data-title');
  var idForm = $(this).attr('href');
  $(idForm).find('[name=id_form]').val(title);
})

var privacy, refusing, compliance, destination;
$('[data-href="disclaimer"]').one('click', function() {

  var nameDisclaimer = $(this).data('disclaimer');

  $.get('disclaimer.html', function (data) {
    privacy = $(data).closest('#privacy').html();
    refusing = $(data).closest('#refusing').html();
    compliance = $(data).closest('#compliance').html();
    disclaimerDest(nameDisclaimer);
  });

});

$('[data-href="disclaimer"]').click(function() {
  var nameDisclaimer = $(this).data('disclaimer');
  disclaimerDest(nameDisclaimer);
});

destination = $('#disclaimer .content');
function disclaimerDest(nameDisclaimer) {

  switch (nameDisclaimer) {
    case 'privacy':
      destination.html(privacy);
      break;
    case 'refusing':
      destination.html(refusing);
      break;
    case 'compliance':
      destination.html(compliance);
      break;
  };

};


/* Validate Form
   -------------------------------------------------------------------------- */
  var warning_ico = '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>', 
      error_mess_1 = '<div class="allert"><span>Заполните это поле</span>' + warning_ico + '</div>', 
      error_mess_2 = '<div class="allert"><span>Введите корректный e-mail</span>' + warning_ico + '</div>', 
      error_mess_3 = '<div class="allert"><span>Введите корректный номер телефона</span>' + warning_ico + '</div>';

  function validateForm(thisForm, ref){
    validForm = true;
    thisForm.find('.allert').remove();
    thisForm.find('.error').removeClass('error'); 

    jQuery(ref).each(function() {
      jQuery(this).removeClass('error');      

      if (jQuery(this).val() == '') {
        var errorfield = jQuery(this);
        jQuery(this).addClass('error');     
        validForm = false;
        thisForm.find(":input.error:first").focus();
      } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (jQuery(this).attr("type") == 'email' || jQuery(this).attr("name") == 'email' ) {
          if (!pattern.test(jQuery(this).val())) {
            jQuery("[name=email]").val('');
            jQuery(this).addClass('error');         
            validForm = false;
            thisForm.find(":input.error:first").focus();
          }
        }
        var patterntel = /^([0-9_+\.-]{10,18})/i;
        if (jQuery(this).attr("type") == 'tel' || jQuery(this).attr("name") == 'tel' ) {
          if (!patterntel.test(jQuery(this).val())) {
            jQuery("[name=tel]").val('');
            jQuery(this).addClass('error');           
            validForm = false;
            thisForm.find(":input.error:first").focus();
          }
        }
      }
    });
    return validForm;
  }


/* Form
   -------------------------------------------------------------------------- */
    var timerErrorForm;
    jQuery(function() {
        jQuery("[name=send]").click(function(e) {
          e.preventDefault();
            
          var error, btn = jQuery(this),
              idForm = btn.closest('form').attr("id"),
              thisForm = btn.closest('form'),
              idSuccess = thisForm.attr('data-id-success'),
              ref = thisForm.find('[required]'), 
              send_btn = thisForm.find('[name=send]'),
              field_file = thisForm.find('[type=file]');               

          if ( validateForm(thisForm, ref) ){            

              console.log("ajax sending form...");

              var formData = new FormData( $(thisForm)[0] );
              // if( $(field_file).length > 0){
              //   var ins = document.getElementById('atach').files.length;
              //   for (var x = 0; x < ins; x++) {
              //     formData.append("files[]", document.getElementById('atach').files[x]);
              //   }
              // }

              jQuery(send_btn).each(function() {
                  jQuery(this).attr('disabled', true);
              });
              

              jQuery.ajax({
                  type: 'POST',
                  url: 'send.php',
                  data: formData,
                  async: false,
                  processData: false, 
                  contentType: false, 
                  success: function(response) {                  

                    setTimeout(function() {
                       jQuery("[name=send]").removeAttr("disabled");
                    }, 1000);

                    btn.closest('form').submit();

                    // console.log('response',response);
                    // response = JSON.parse(response);

                    if( response ){

                      // sendAnalytics(idForm);

                      $.fancybox.close();

                      setTimeout(function() {
                        if( idSuccess != undefined && idSuccess != "" ){
                          $.fancybox.open({
                            src : idSuccess,
                          });
                          setTimeout(function () {
                            $.fancybox.close();
                          }, 5000);
                        }    
                      }, 250);
                      
                      thisForm.trigger("reset"); 

                    }else{
                      console.log(response['message']);
                    }                  
                  },
                  error: function(xhr, ajaxOptions, thrownError) {},
                  complete: function() {
                      jQuery(send_btn).each(function() {
                          jQuery(this).attr('disabled', false);
                      });
                  }
              });
            
          } else {
            clearErrorMesForm();
          }
          return false;
        })
    });

  function clearErrorMesForm(){
    clearTimeout(timerErrorForm);
    timerErrorForm = setTimeout(function() {
       jQuery(".field.error").removeClass('error');
       jQuery("input.error").removeClass('error');
       jQuery(".allert").remove();
    }, 5000);
  }





/* Send Analytics: Google & Yandex
   -------------------------------------------------------------------------- */
  function sendAnalytics(idForm){
    var idForm = idForm;
    switch (idForm) {
      case 'form_order_1': 
      case 'form_order_2': 
      case 'form_order_3': 
      case 'form_order_5':         
        console.log("Send Analytics - ok");
        break;   

      default:
        break;
        return true;
    }
    return true;
  }




});