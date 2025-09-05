$(function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	//PageScroll#id
	$("a.scroll").mPageScroll2id();

	//fancybox
	$("a.modal").fancybox();
	$("a.modall_pad").fancybox({
		padding: 0,
		margin: 0
	});

	//slick
	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		focusOnSelect: true,
		arrows: false,
		responsive: [
		  {
		    breakpoint: 566,
		    settings: {
		      slidesToShow: 3,
		      centerMode: true
		    }
		  }
		]
	});

	//jScrollPane
	$('.scroll-pane').jScrollPane();

	//flickity
	$('#three .main-gallery ').flickity({
		cellAlign:'left',
		contain:true,
		wrapAround:true,
		autoPlay:5000,
		selectedAttraction:0.01,
		friction:0.15,
		prevNextButtons:false,
		adaptiveHeight: true
	});
	
	var $gallery2=$('#three .main-gallery').flickity();
	$('#three .right').on('click',function(){
		$gallery2.flickity('next')
	});
	var $gallery2=$('#three .main-gallery').flickity();
	$('#three .left').on('click',function(){
		$gallery2.flickity('previous')
	});

	//jScrollPane
	$('.scroll-pane').jScrollPane();
	
});

//Форма отправки 2.0
$(function() {
	$("[name=send]").click(function () {
		$(":input.error").removeClass('error');
		$(".allert").remove();

		var error;
		var btn = $(this);
		var ref = btn.closest('form').find('[required]');
		var msg = btn.closest('form').find('input, textarea');
		var send_btn = btn.closest('form').find('[name=send]');
		var send_options = btn.closest('form').find('[name=campaign_token]');

		$(ref).each(function() {
			if ($(this).val() == '') {
				var errorfield = $(this);
				$(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
				error = 1;
				$(":input.error:first").focus();
				return;
			} else {
				var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
				if ($(this).attr("type") == 'email') {
					if(!pattern.test($(this).val())) {
						$("[name=email]").val('');
						$(this).addClass('error error_email').parent('.field').append('<div class="allert"><span>Некоректный e-mail</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
						error = 1;
						$(":input.error:first").focus();
					}
				}
				var patterntel = /^()[+0-9]{9,18}/i;
				if ( $(this).attr("type") == 'tel') {
					if(!patterntel.test($(this).val())) {
						$("[name=phone]").val('');
						$(this).addClass('error error_tel').parent('.field').append('<div class="allert"><span>Некоректный номер телефона</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
						error = 1;
						$(":input.error:first").focus();
					}
				}
			}
		});
		if(!(error==1)) {
			$(send_btn).each(function() {
				$(this).attr('disabled', true);
			});
			$(send_options).each(function() {
        		var form = $(this).closest('form'), name = form.find('.name').val();
				if ($(this).val() == '') {
					$.ajax({
						type: 'POST',
						url: 'mail.php',
						data: msg,
						success: function() {
							$('form').trigger("reset");
							setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
                            $(".fancybox-close").click();
                            yaCounter41128494.reachGoal('zayavka');
                            window.location = "http://ollwood.com.ua/success.html";
                        },
                        error: function(xhr, str) {
                        	alert('Возникла ошибка: ' + xhr.responseCode);
                        }
                    });
				} else {
					$.ajax({
						type: 'POST',
						url: 'mail.php',
						data: msg,
						success:
						$.ajax({
							type: 'POST',
							url: 'https://app.getresponse.com/add_subscriber.html',
							data: msg,
							statusCode: {0:function() {
								$('form').trigger("reset");
								setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
								$(".fancybox-close").click();
								yaCounter41128494.reachGoal('zayavka');
                           		window.location = "http://ollwood.com.ua/success.html";
							}}
						}),
						error:  function(xhr, str) {
							alert('Возникла ошибка: ' + xhr.responseCode);
						}
					});
				}
			});
		}
		return false;
	})
});

//MENU
$(document).ready(function() {
	$('#nav').css({'visibility' : 'visible', 'opacity':'1'});

	$( "#hmt" ).click(function() {
		$('#nav').toggleClass('open');
	});

	$( "#nav li a" ).click(function() {
		$('#hmt').click();
	});
});

//parallax
$(window).scroll(function() {
	var st = $(this).scrollTop() /20;
	$(".header_parallax").css({
		"transform" : "translate3d(0px, " + st  + "%, .01px)",
		"-webkit-transform" : "translate3d(0px, " + st  + "%, .01px)",
		"-ms-transform" : "translate3d(0px, " + st  + "%, .01px)"
	});	
});