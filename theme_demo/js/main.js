var isMobile = false;

function viewport() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function MobileCheck() {
  if (viewport().width < 768) {
    isMobile = true;
  }
  else {
    isMobile = false;
  }
}

function getInternetExplorerVersion() {
// Returns the version of Internet Explorer or -1 (indicating the use of another browser).

  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
  
var ieVer = getInternetExplorerVersion();
var isAtLeastIE11 = !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/));


function parallaxInit() {
  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.2;

  function parallaxScroll() {
    if (!isMobile) {
      [].slice.call(parallax).forEach(function(el,i){

        var windowYOffset = window.pageYOffset - el.offsetTop - 50,
            elBackgrounPos = "center " + (windowYOffset * speed) + "px";

        el.style.backgroundPosition = elBackgrounPos;

      });
    }
    else {
      [].slice.call(parallax).forEach(function(el,i){

        var elBackgrounPos = "center";
        el.style.backgroundPosition = "center 0";

      });
    }    
  };

  window.onscroll = function(){
    parallaxScroll();
  };

  parallaxScroll();

} // END parallaxInit();

//function buildNavigation() {
//  var navLevel = 0;
//  
//  $('.navbar-toggle').click( function() {
//    if (isMobile) {
//      $(this).mobileNavHeight();
//    }
//  });
//  
//  $('.navbar .navbar-nav li').not('.navbar.footer .navbar-nav li').hover( function() {
//    if (!isMobile) {
//      var ul = $(this).children('ul'),
//          ulHeight = 0;
//      ul.children('li').not('.sub-nav, .sub-nav-back').each( function() {
//        ulHeight += $(this).height();
//      });
//      ul.height(ulHeight);
//    }
//  },
//  function() {
//    if (!isMobile) {
//      var ul = $(this).children('ul');
//      ul.height('');
//    }
//  });
//  
//  $('.navbar ul.navbar-nav li').not('.navbar.footer ul.navbar-nav li').each( function() {
//    if($(this).children('ul').length != 0) {
//      $(this).children('a').append('<span class="sub-nav">&#9654;</span>');
//      $(this).children('ul').prepend('<li class="sub-nav-back">&#9664; Back</span>');
//    }
//  });
//
//  $('.navbar ul.navbar-nav .sub-nav').not('.navbar.footer ul.navbar-nav .sub-nav').click( function(event) {
//    event.stopPropagation();
//    event.preventDefault();
//    var t = $(this);
//    navLevel++;
//    console.log('navlevel: ' + navLevel);
//    $(this).closest('li').siblings('li').find('ul').css('display','none');
//    $(this).closest('li').children('ul').css('display','block');
//    $('ul.navbar-nav').css('left','-' + navLevel + '00%');
//    if (isMobile) {
//      setTimeout( function() {
//        t.mobileNavHeight();
//      },1);
//    }
//  });
//
//  $('.navbar ul.navbar-nav .sub-nav-back').not('.navbar.footer ul.navbar-nav .sub-nav-back').click( function(event) {
//    event.stopPropagation();
//    event.preventDefault();
//    navLevel--;
//    if(navLevel <= 0) {
//      navLevel = 0;
//      console.log('navlevel: ' + navLevel);
//      $('ul.navbar-nav').css('left','0');
//    }
//    else
//    {
//      console.log('navlevel: ' + navLevel);
//      $('ul.navbar-nav').css('left','-' + navLevel + '00%');
//    }
//    if (isMobile) {
//      $(this).mobileNavHeight();
//    }
//  });
//}

//function setMainNavWidth() {
//  if (!isMobile) {
//    var mainNavWidth = $('.navbar-default').innerWidth() - $('.navbar-brand').innerWidth();
//    $('.navbar-default .navbar-collapse').css("width", mainNavWidth + "px");
//  }
//}

//function justifyList(container) {
//  if (container.length > 0) {
//    if (!isMobile) {
//      var containerWidth = container.innerWidth();
//      var listWidth = 0;
//      container.find('>ul>li>a').css({"padding-left": "0", "padding-right": "0", "opacity": "0" }); 
//      container.find('>ul>li>a').each( function() {
//        listWidth = listWidth + $(this).width();
//      });
//      var navPadding = (containerWidth - listWidth - 1)/(container.find('>ul>li>a').length * 2);
//      container.find('>ul>li>a').css({"padding-left": navPadding + "px", "padding-right": navPadding + "px"});  
//      setTimeout(container.find('>ul>li>a').css("opacity", "1" ),300);
//    };
//  }
//}

$.fn.mobileNavHeight = function() {
  var self = this,
      isOpen = false;
  if ($('.navbar-collapse').hasClass('in')) {
    isOpen = true;
  }
  setTimeout( function() {
    if (self.hasClass('navbar-toggle')) {
      var newHeight = $('.main-nav-container .navbar-nav').height() +
          $('.second-nav-container .navbar-nav').height();
      $('.navbar-collapse').css('max-height', newHeight);
      if (isOpen) {
        $('.navbar-collapse').css('height', '');
      }
    }
    else
    {
      if (self.hasClass('sub-nav')) {
        var newHeight = self.closest('li').children('ul').height();
        //        t.closest('li').children('ul').css('border','3px solid red');
        //        console.log(t.closest('li').find('ul').first());
        //        console.log('in: ' + newHeight);
        $('.navbar-collapse').css('max-height', newHeight);
        if (isOpen) {
          $('.navbar-collapse').css('height', newHeight);
        }
      }
      else if (self.hasClass('sub-nav-back')) {
        var newHeight = self.parent('ul').parent().closest('ul').height();
        //        t.parent('ul').parent().closest('ul').css('border','3px solid red');
        //        console.log(t.parent('ul').parent().closest('ul'));
        //        console.log('back: ' + newHeight);
        $('.navbar-collapse').css('max-height', newHeight);
        if (isOpen) {
          $('.navbar-collapse').css('height', newHeight);
        }
      }
    }
  },1);

}

function breakURLS() {
  $('a').each( function() {
    var text = $(this).text();
    if (text.indexOf('http') == 0 || (text.indexOf(' ') == -1 && text.length >= 20)) {
      $(this).css('word-break','break-all');
    }
  });
}

function addReaderDownloads() {
  var readers = 0;
  if ( $('a[href$=".pdf"], a[href$=".PDF"]').length > 0 ) {
    $('#readers').append('<a class="download noexit" href="https://get.adobe.com/reader/" target="_blank" title="Download Adobe PDF Reader"><img src="/sites/all/themes/lrp/images/pdf-icon.png" alt="Adobe PDF Reader Logo"><span class="sr-only">Adobe Acrobat Reader Download</span></a>');
    $('#readers').css('display', 'block');
    readers++;
  }
  if ( $('a[href$=".doc"], a[href$=".docx"], a[href$=".docm"], a[href$=".rtf"], a[href$=".DOC"], a[href$=".DOCX"], a[href$=".DOCM"], a[href$=".RTF"]' ).length > 0) { 
    $('#readers').append('<a class="download noexit" href="http://www.microsoft.com/en-us/download/details.aspx?id=4" target="_blank" title="Download Microsoft Word Viewer"><i class="icon-office-word"></i><span class="sr-only">Microsoft Word Viewer Download</span></a>');
    $('#readers').css('display', 'block');
    readers++;
  }
  if ($('a[href$=".xls"], a[href$=".xlsx"], a[href$=".xlsm"], a[href$=".XLS"], a[href$=".XLSX"], a[href$=".XLSM"]').length > 0 ) {
    $('#readers').append('<a class="download noexit" href="http://www.microsoft.com/en-us/download/details.aspx?id=10" target="_blank" title="Download Microsoft Excel Viewer"><i class="icon-office-excel"></i><span class="sr-only">Microsoft Excel Viewer Download</span></a>');
    $('#readers').css('display', 'block');
    readers++;
  }
  if ( $('a[href$=".ppt"], a[href$=".pptx"], a[href$=".pptm"], a[href$=".PPT"], a[href$=".PPTX"], a[href$=".PPTM"]').length > 0 ) {
    $('#readers').append('<a class="download noexit" href="http://www.microsoft.com/en-us/download/details.aspx?id=13" target="_blank" title="Download Microsoft PowerPoint Viewer"><i class="icon-office-powerpoint"></i><span class="sr-only">Microsoft Power Point Viewer Download</span></a>');
    $('#readers').css('display', 'block');
    readers++;
  }
  if (readers > 1) {
    $('#readers').prepend('Download Readers: ');
  }
  else if (readers == 1) {
    $('#readers').prepend('Download Reader: ');
  }
}

//function arrowSize() {
//  var arrowHalfWidth = ($('.sticky-nav li.active').width() + 1)/2;
//  $('.sticky-nav li.active a .arrow').css({'border-left-width': arrowHalfWidth + 'px','border-right-width': arrowHalfWidth + 'px'});
//}

function subPageHeader() {
  if ($('body').hasClass('subpage') && !$('body').hasClass('ambassadors')) {
    var num = Math.floor((Math.random() * 3) + 1),
        color = 'blue',
        domain = '';

    if ($('body').hasClass('renew')) {
      color = 'green';
    }
    else if ($('body').hasClass('awardees')) {
      color = 'yellow';
    };
    
    domain = 'http://dev.nete.com/lrp/templates/';

    $('.header').css('background-image','url("' + domain + 'images/bg/' + color + '-' + num  + '.jpg")');
  }
}

function switchClassName(elem) {
  var parentElem = elem.closest('.switch-bar a, .switch-content'),
      className = '';
  if (parentElem.hasClass('applicants')) {
    return('.applicants');
  };
  if (parentElem.hasClass('renew')) {
    return('.renew')
  };
  if (parentElem.hasClass('awardees')) {
    return('.awardees')
  };
}

function activateSwitch(name) {
  if (!isMobile) {
    $('p.title').css('display','none');
    var content = '.switch-content' + name,
        bar = '.switch-bar ' + name;
    $(name).addClass('active');
    $(bar).removeClass('inactive');
    $(bar).siblings('a').addClass('inactive');
  }
}

function deactivateSwitch() {
  $('p.title').css('display','block');
  if (!isMobile) {
    $('.switch-content, .switch-bar a').removeClass('top');
    $('.switch-content, .switch-bar a').removeClass('active');
    $('.switch-content, .switch-bar a').removeClass('inactive');
    $('.switch-content.default').addClass('active');
  }
}

function calculateLoanPayment() {  
  var str = '',
      income = 0,
      debt = 0,
      type,
      program,
      maxLoanYearly1 = 17000.00,
      maxLoanYearly2 = 35000.00,
      loanYear1 = 0.00,
      loanYear2 = 0.00;
  
  function format(fl) {
    return(fl.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  
  function payment(amount) { // Showing Results
    var className,
        total = 0.00,
        quarterly;
    $('#debt').val(format(debt));
    $('#income').val(format(income));
    
    for (i = 0; i < 3; i++) {
      className = '.year' + (i + 1).toString() ;
      if (amount[i] > 0 ) {
        $(className).addClass('calculated');
        className = className + '-payment';
        quarterly = format(parseFloat(amount[i])/4);                   
        $(className).html('$' + quarterly);
        $(className).addClass('calculated');
        total += parseFloat(amount[i]);
      } else {
        $(className).removeClass('calculated');
        className = className + '-payment';
        $(className).removeClass('calculated');
      }
    }
    $('.amount').html('$' + format(total));
    $('.results table').addClass('calculated');
  }
  
  $('#calculator-notes').html('<span class="sr-only">Results notes</span>');  
  $('tr').removeClass('calculated');
  $('.amount').html('&nbsp;');
  
  // Initialization and Checks
  
  type = $('input[name=type]:checked').val();  
  if (type == null) {
    $('#calculator-warning').html('Please Choose an Award Type: New or Renew'); return;
  }
  
  program = $('input[name=program]:checked').val();
  if (program == null) {
    $('#calculator-warning').html('Please Choose a Program'); return;
  }  
  
  str = $('input[id=debt]').val().replace(',','');
  if (str == '') {
    $('#calculator-warning').html('Please Enter Debt Amount'); 
    $('input[id=debt]').val(''); return;
  } else {
    debt = parseFloat(str);
    if ( isNaN(debt) || (debt == 0) ) {
      $('#calculator-warning').html('Please Enter Debt Amount'); 
      $('input[id=debt]').val(''); return;
    }
  }
  
  str = $('input[id=income]').val().replace(',','');
  if (!$('#income').prop('disabled')) { 
    if (str == '')  {    
      $('#calculator-warning').html('Please Enter Your Annual Base Salary Amount');
      $('input[id=income]').val(''); return;
    } else {
      income = parseFloat(str);
      if ( isNaN(income) || (income == 0)) {
        $('#calculator-warning').html('Please Enter Your Annual Base Salary Amount');
        $('input[id=income]').val(''); return;
      }
    }
  }
  
  // Calculations
  
  if ( type == 'new') { 
    if ( (debt/income) < .2 ) { // Scenario 1
      $('#calculator-warning').html('Your Debt to Income Ratio must be at least 20% for you to apply for a new award.'); return;
    }
    if (program == 'intramural-general') { // Scenario 3
      loanYear1 = Math.min((debt/4), maxLoanYearly2);
      payment([loanYear1, loanYear1, loanYear1]);
    } else if (program == 'intramural-acgme') { //Scenario 4
      loanYear1 = Math.min((debt/4), maxLoanYearly1);
      payment([loanYear1, loanYear1, loanYear1]);
    } else { // Scenario 2
      loanYear1 = Math.min(debt/4, maxLoanYearly2);
      payment([loanYear1, loanYear1, 0]);
    }
  } else if (type == 'renew') {
    if (program == 'intramural-acgme') { // Scenario 7
      $('#acgme-warning').html('ACGME awardees must apply to the General LRP for a renewal award'); return;
    };
    if (debt <= 2000) { // Scenario 8
      $('#calculator-warning').html('You must have at least $2,000 in eligible educational debt to apply for a renewal award.'); return;
    } else if ((debt > 2000) && (debt <= 10000)) { // Scenario 9 
      payment([debt, 0, 0]); 
    } else {  
      if ( program.match('extramural') != null ) {
        if (( debt > 10000) && (debt <= 20000)) { // Scenario 10
          loanYear1 = parseFloat(debt)/2;
          payment([loanYear1, loanYear1, 0]);
          $('#calculator-notes').html('Payment amount for the second renewal year may change due to interest accrued during the first year of the renewal award.');
        } else { // Scenario 5
          loanYear1 = Math.min((debt/2), maxLoanYearly2);
          loanYear2 = Math.min((debt - loanYear1)/2, maxLoanYearly2);
          payment([loanYear1, loanYear2, 0]);
          $('#calculator-notes').html('Renewal awards may be for one or two years. Payment amount for the second renewal year may change due to interest accrued during the first year of the renewal award.');
        }
      } else if ( program.match('intramural') != null ) { // Scenario 6
        loanYear1 = Math.min((debt/2), maxLoanYearly2);
        payment([loanYear1, 0, 0]);
      }
    }
  } 
  $('.modal').animate({scrollTop: 0}, 300);
}

function closeProgramPanel(event) {;
  if ($('body').hasClass('programs-eligibility')) {
    if ($('.program-panel.open').length > 0) {
      if (!$(event.target).closeset('.program-panel.open')) {
        $('.program-panel.open .btn-program-toggle').html('Show Details');
        $('.program-panel.open .collapse').removeClass('in');    
        $('.program-panel.faded').removeClass('faded');
        $('.program-panel.open').removeClass('open');
      }
    }
  }
}

function findActiveNav() {
  if ($('body').hasClass('programs')) {
    if ($('body').hasClass('applicants') || $('body').hasClass('renew')) {
      $('.nav-list.second .nav-cards').addClass('active'); return;
    }    
  }
  $('.nav-list li:not(.nav-cards) > a').each( function() { 
    var link = $(this).attr('href').split('/').pop();
    if ($('body').hasClass(link)) {
      $(this).closest('li').addClass('active'); return;
    }
  });
}

//function exitLinkCheck() {
//  var a = $('a').not('.subpage .search a'); // .not() is used to exclude links in Google search
//  a.each( function() {
//    var self = $(this),
//        href = self.attr('href'),
//        newLink = $('<a href="#exit-link-disclaimer" data-toggle="modal" data-target="#externalLinkModal"><img src="/sites/all/themes/lrp/images/exit-icon.png" alt="exit link icon"/></a>');
//    if (!self.hasClass('noexit')) {
//      if (href) {
//        if (href.indexOf('localhost') == -1 && href.indexOf('bd2k.nete.com') == -1 && href.indexOf('.gov') == -1 && href.indexOf('#') != 0 && href.indexOf('/') != 0 && (href.indexOf('http://') == 0 || href.indexOf('https://') == 0)) {
//          self.attr('target','_blank');
//          self.after(newLink);
//        }
//      }
//    }
//  });
//  $('.exit-link').click( function() {
//    var href = $(this).attr('href'),
//        exitModal = $('#exitModal'),
//        exitURL = exitModal.find('.exit-url'),
//        exitContinue = exitModal.find('.exit-continue');
//
//    exitURL.attr('href',href).text(href);
//    exitContinue.attr('href',href);
//
//  });
//}

$(window).load(function() {
  $('.btn-2top').html('<span class="tip">Back to Top</span>');
  var offsetSticky = 0;  
  if ($('.sticky-nav').length > 0) {
//    $('.sticky-nav li > a').append('<span class="arrow"><span class="sr-only">&nbsp;</span></span>');
    offsetSticky = $('.sticky-nav').offset().top;      
    if ( offsetSticky <= $(document).scrollTop()) {
      $('.sticky-nav').addClass('top');
      $('html, body').animate({scrollTop: offsetSticky}, 300);
//      arrowSize();
    } else {
      $('.sticky-nav').removeClass('top');
    };
    $('.sticky-nav li > a').on('shown.bs.tab', function() {
      $('.sticky-nav.top .nav-tabs li.active > a').focus(); 
//      var arrowHalfWidth2 = ($(this).parent('li').outerWidth() + 1)/2;
//      $(this).children('.arrow').css({'border-left-width': arrowHalfWidth2 + 'px','border-right-width': arrowHalfWidth2 + 'px'});
    });
    
    $('.sticky-nav.top .nav-tabs li.active > a').on('shown.bs.tab', function() {
      $(this).focus(); 
    });

    $('.sticky-nav.program li > a').on ('click', function() {
      if ( offsetSticky <= $(document).scrollTop()) {
        $('html, body').animate({scrollTop: offsetSticky}, 300);
      }
    });
    
    $('.awardees .sticky-nav li > a').on ('click', function(event) {
      event.preventDefault();
      var targetID = $(this).attr('href'),
          targetOffset = $(targetID).offset().top - $('.sticky-nav').height() + 28;
      $('.sticky-nav.awardees li').removeClass('active');
      $(this).parent().addClass('active');      
      $('html, body').animate({scrollTop: targetOffset}, 300);
    });
  };
  
  MobileCheck();
//  buildNavigation();
  breakURLS();
  addReaderDownloads(); 
  subPageHeader();
  findActiveNav();
  
//  setMainNavWidth();
//  justifyList($('.main-nav-container'));
//  justifyList($('.second-nav-container'));
  
  $('.header-bg-slider').flexslider( {
    animation: "slide",
    animationLoop: true,
    directionNav: false,
    controlNav: true,
    slideshowSpeed: 10000
  });

  $('.featured-slider').flexslider({
    animation: "slide",
    animationLoop: true,
    directionNav: false,
    controlNav: true,
    slideshowSpeed: 10000
  });
  
  if ($('body').hasClass('program')) {
    if ($('body').hasClass('intramural')) {
      $('a[href="/contact-engage"]').attr('href','/contact-engage#intramural');
    }
  }
  
  if ($('body').hasClass('contact-engage')) {
    var curUrl = document.location.toString().split('/').pop();
    var hashLink = curUrl.split('#')[1];
    if (hashLink == 'intramural') {
      $('#collapse3-heading').tab('show');
    }
  };
  
  if ($('body').hasClass('programs-eligibility')) {
    var curUrl = document.location.toString().split('/').pop();
    var hashLink = curUrl.split('#')[1];
    if (hashLink == 'intramural-tab') {
      console.log('intramural')
      $('a[href=#intramural]').tab('show');
    }
  };

  // Init parallax
  if (ieVer > 8 || ieVer == -1) {
    parallaxInit();  
  }
  
  $("#skip-nav").on ('click', function(event){
    console.log('skip!');
    var skipTo="#"+this.href.split('#')[1];
    $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
      $(this).removeAttr('tabindex');
    }).focus();
  });
  
  
  $('.search input').focusin( function() {
    $('.search a').addClass('focused');
    $('.quick-links').addClass('expanded');
  });  
  $('.search input').focusout( function() {
    $('.search a').removeClass('focused');
    $('.quick-links').removeClass('expanded');
  });
  
  $('.search').hover( function() {
    $('.quick-links').addClass('expanded');
  },
                       function() {    
    if (! $('.search a').hasClass('focused')) {
      $('.quick-links').removeClass('expanded');
    }
  });
    
  var baseFontSize = parseInt($('body').css('font-size')),
      fontIncrement = 2,
      fontMax = baseFontSize + (fontIncrement * 3);

  $('.accessibility-nav #decrease-text').on ('click', function() {
    if (! $(this).hasClass('disabled')) {
      var newSize = parseInt($('body').css('font-size')) - fontIncrement;
      $('body').css('font-size', newSize);
      if (newSize <= baseFontSize) {
        $('.accessibility-nav #decrease-text').addClass('disabled');
      }
      if (newSize >= fontMax - fontIncrement) {
        $('.accessibility-nav #increase-text').removeClass('disabled');
      }
    }  
  });  

  $('.accessibility-nav #increase-text').on ('click', function() {
    if (! $(this).hasClass('disabled')) {
      var newSize = parseInt($('body').css('font-size')) + fontIncrement;
      $('body').css('font-size', newSize);
      if (newSize >= baseFontSize + fontIncrement) {
        $('.accessibility-nav #decrease-text').removeClass('disabled');
      }
      if (newSize >= fontMax) {
        $('.accessibility-nav #increase-text').addClass('disabled');
      }
    }  
  });  
  
  $('.tab-pane > .pager > a').on ('click', function () {
    if ($('.sticky-nav').length > 0) {
      var tabName = $(this).attr("aria-controls"),
          targetStr = '.sticky-nav ul li a[aria-controls=' + tabName + ']',
          target =$(targetStr).parent('li');
      target.addClass('active');
      target.siblings('li').removeClass('active');
      arrowSize();  
      $('html, body').animate({scrollTop: offsetSticky}, 300);
    }
  });
  
  $('.icons-navbar li').matchHeight();
  $('.tile').matchHeight();
  $('.content-well').matchHeight();
  $('.banner.pic, .banner img').matchHeight();
//  $('.featured>div, .featured .gradient').matchHeight();
  $('.tabpanel>ul>li>a').matchHeight();
  $('.program-panel, .program-panel-header').matchHeight();

  $('.print-section').on ('click', function(event){
    event.preventDefault();
    $(this).closest('.row').printElement();
  });
  
  $('.faqs-panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('a').removeClass('minus');
  });  
  $('.faqs-panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('a').addClass('minus');
  });
  
  $('.switch-bar a').on ('click', function (event) {
//    event.preventDefault();
    if (isMobile) { 
      if ($(this).hasClass('active')) {
        $('.switch-content, .switch-bar a').removeClass('active');
        $('.switch-bar a').removeClass('top');
        $('.switch-content.default').addClass('active');
      } else {
        $('.switch-content, .switch-bar a').removeClass('active');
        $('.switch-bar a').removeClass('top');
        if ( $(this).hasClass('applicants') ) {
          $('.applicants').addClass('active');
          $('.switch-bar .applicants').addClass('top');
          return;
        } else if ($(this).hasClass('awardees')) {
          $('.switch-bar .applicants').addClass('top');
          $('.switch-bar .awardees').addClass('top');
          $('.awardees').addClass('active'); 
          return;
        } else if ($(this).hasClass('renew')) {
          $('.switch-bar .applicants').addClass('top');
          $('.switch-bar .awardees').addClass('top');
          $('.switch-bar .renew').addClass('top');
          $('.renew').addClass('active');
        }
      }
    }
  });
  
  $('.switch-content:not(.default), .switch-bar a').hover( 
    function () {
      var elem = $(this),
          className = switchClassName(elem);
      activateSwitch(className)
    }, function () {
      deactivateSwitch()
  });
  
  $('.switch-content a').focus( function() {
    var className = switchClassName($(this));
    activateSwitch(className);
  });
  $('.switch-content a').blur ( function() {
      var className = '.switch-content' + switchClassName($(this)) + ' a:focus';
      if ($(className).length < 1) {  
        deactivateSwitch();
      }
    }  
  );
  
  $('.nav-cards > a').on ('click', function(event) {
    event.preventDefault();
  });
  $('.nav-cards').hover( function() {
    $('.nav-cards > ul').stop().slideDown(300);     
    $(this).addClass('active');
  },
                            function() {
    $('.nav-cards > ul').stop().slideUp(300);
    if (!$('body').hasClass('programs')) {
      if (!$('body').hasClass('applicants') && !$('body').hasClass('renew')) {
    $(this).removeClass('active');
      }
    }
  });    
  $('.nav-cards > a').on('focus', function() {
    $('.nav-cards > ul').stop().slideDown(300);
    $('.nav-cards').addClass('active');
  });
  $('.nav-cards a').on('blur', function() {
    setTimeout(function() {
      if ( $('.nav-cards a:focus').length < 1 ) {
        $('.nav-cards > ul').stop().slideUp(300);
        if (!$('body').hasClass('programs')) {
          if (!$('body').hasClass('applicants') && !$('body').hasClass('renew')) {
            $(this).removeClass('active');
          }
        }
      } 
    }, 100);
  });  
      
  var currentDatabookName = '';
  
  $('a.databook').on ('click', function() {
    currentDatabookName = $(this).html();
  });
  $('#databookModal').on('show.bs.modal', function () {
    $('#databookModal .modal-title').html(currentDatabookName);
  });   
  $('#databookModal').on('hidden.bs.modal', function () {
    $('#databookModal .modal-title').html('<span class="sr-only">Modal Title</span>');
  });  
  
  $('.btn-program-toggle').on ('click', function () {
    var currentProgram = $(this).closest('.program-panel');
    var buttonName = $(this).html();
    if ( currentProgram.hasClass('open') ) {
      if (buttonName == "Hide Details") {
        $(this).html('Show Details');
        currentProgram.removeClass('open');
        currentProgram.closest('.tab-pane').find('.program-panel').removeClass('faded');
      } else if (buttonName == 'Show Details') {
        currentProgram.find('.btn-program-toggle').html('Show Details');
        currentProgram.find('.collapse.in').removeClass('in');      
        $(this).html('Hide Details');        
      }
    } else {
      currentProgram.addClass('open');
      currentProgram.siblings('.program-panel').addClass('faded');
      currentProgram.closest('.column-half').siblings().find('.program-panel').addClass('faded');
      $(this).html('Hide Details');
    }
  });
  
  $('.app-review a[role=tab]').on('click', function() {
    $('.app-review a[role=tab].active').removeClass('active');
  });  
  
  $('.app-review .pager a[data-toggle="tab"]').on('shown.bs.tab', function () {
    var link = '.app-review-nav a[href=' + $(this).attr('href') + ']';
    $('.app-review-nav a[data-toggle="tab"].active').removeClass('active');
    $(link).addClass('active');
  })
  
  $('#calculate').on ('click', function() { calculateLoanPayment(); });
  $('#calculator-reset').on ('click', function() {
    $('input[type=radio]:checked').prop( 'checked', false );
    $('label.selected').removeClass('selected');
    $('.calculated').removeClass('calculated');
    $('.amount').html('&nbsp;');
    $('input[id=debt]').val('');
    $('input[id=income]').val('');
    $('#calculator-notes').html('<span class="sr-only">Results notes</span>');  
    $('.warnings:not(#calculator-notes)').html('&nbsp;');
    $('#debt, #income').removeAttr('disabled');
  });
  
  $('input[class=number]').keypress(function (evt){
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[\d\.]/;
    var objRegex = /^\d*[\.]?\d*$/;
    var val = $(evt.target).val();
    if(!regex.test(key) || !objRegex.test(val+key) || 
       !theEvent.keyCode == 46 || !theEvent.keyCode == 8) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    };
  }); 
  $('input[class=number]').focus( function() {
    $(this).val($(this).val().replace(',',''));
  });
  
  $('.calculator-well input[type=radio]').change( function() {
    if ($(this).prop('checked')) {
      $(this).closest('fieldset').find('.selected').removeClass('selected');
      $(this).parent('label').addClass('selected');
    }
    if ($('#type-renew').prop('checked')) {
      $('#income').attr('disabled','disabled');
      $('label[for=debt]').html('Estimated Remaining Debt at Start of Renewal Award:');
      if ($('#intramural-acgme').prop('checked')) {
        $('#acgme-warning').html('ACGME awardees must apply to the General LRP for a renewal award');
        $('#debt').attr('disabled','disabled'); return;
      } else {
        $('#debt').removeAttr('disabled');
        $('.warnings:not(#calculator-notes)').html('&nbsp;');
      }
      $('#calculator-warning').html('There is no debt-to-income ratio requirement for renewal applicants, thus salary information is not required.');
    } else if ($('#type-new').prop('checked')) {
      $('label[for=debt]').html('Eligible Educational Debt Amount:');
      $('#income, #debt').removeAttr('disabled');
      $('.warnings:not(#calculator-notes)').html('&nbsp;');
    } 
  });
  
  $('.dropdown-menu > li > a').on('click', function(event) {
    var str = $(this).html();
    event.preventDefault();
    $(this).closest('.btn-group').find('.dropdown-toggle-caption').html(str);
  });
  
  $('#preparation-filter-all').on('click', function(event) {
    event.preventDefault();
    $('.table-preparation').removeClass('table-preparation-independent');
    $('.table-preparation').removeClass('table-preparation-mentored');
  });
  $('#preparation-filter-mentored').on('click', function(event) {
    event.preventDefault();
    $('.table-preparation').removeClass('table-preparation-independent');
    $('.table-preparation').addClass('table-preparation-mentored');
  });
  $('#preparation-filter-independent').on('click', function(event) {
    event.preventDefault();
    $('.table-preparation').addClass('table-preparation-independent');
    $('.table-preparation').removeClass('table-preparation-mentored');
  });
  
  $('.tile-content-filter a[data-toggle=tab]').on('shown.bs.tab', function() {
    $('.dropdown-menu > li.active').removeClass('active');
  });
  
  $('.expandable > li').each( function() {
    if($(this).children('ul').length > 0 ) {
      $(this).addClass('parent');     
    }
  });
  $('.expandable > li.parent a').on ('click', function() {
    $(this).parent().toggleClass('active');
    $(this).parent().children('ul').slideToggle(100);
  });
  
  $('body').on('click', function(event) { 
    if ($('body').hasClass('programs-eligibility')) {
      if ($('.program-panel.open').length > 0) {
        if (!$(event.target).closest('.program-panel.open').length) {
          $('.program-panel.open .btn-program-toggle').html('Show Details');
          $('.program-panel.open .collapse').removeClass('in');    
          $('.program-panel.faded').removeClass('faded');
          $('.program-panel.open').removeClass('open');
        }
      }
    }
  });
  
  $(window).resize( function() {
    
    MobileCheck();
//    setMainNavWidth();
//    justifyList($('.main-nav-container'));
//    justifyList($('.second-nav-container'));
//    if ($('.sticky-nav').length > 0) {
//      var arrowHalfWidth = ($('.sticky-nav li.active').outerWidth() + 1)/2;
//      $('.sticky-nav li.active a .arrow').css({'border-left-width': arrowHalfWidth + 'px','border-right-width': arrowHalfWidth + 'px'});
//    }
  });
  
  $(window).scroll( function() {
    
    if (ieVer > 8 || ieVer == -1) {
      parallaxInit();  
    }
        
    if ($(this).scrollTop() > 150) { // Offset from the top
      $('.btn-2top').addClass('active'); 
    } else {
      $('.btn-2top').removeClass('active');
    };
    
    if ($('.sticky-nav').length > 0) {
      if ( offsetSticky <= $(document).scrollTop()) {
        $('.sticky-nav').addClass('top');
        $('#content').css("padding-top", "78px");
//        var arrowHalfWidth3 = ($('.sticky-nav li.active').outerWidth() + 1)/2;
//        $('.sticky-nav li.active a .arrow').css({'border-left-width': arrowHalfWidth3 + 'px','border-right-width': arrowHalfWidth3 + 'px'});
        // detect active section on Awardees Page
        $('.awardees .sticky-nav .nav-tabs li').each( function() {
          var targetID = $(this).children('a').attr('href'),
              targetOffset = $(targetID).offset().top - $('.sticky-nav').height() + 23,
              sectionHeight = $(targetID).height(),
              docOffset = $(document).scrollTop();
          if ((docOffset <= (targetOffset + sectionHeight)) && 
              (docOffset >= targetOffset)) {
            $('.sticky-nav .nav-tabs li').removeClass('active');
            $('.sticky-nav .nav-tabs li a').blur();
            $(this).addClass('active');
          }
        });
      } else {
        $('.sticky-nav').removeClass('top');
        if ($('.sticky-toggle').hasClass('collapsed')) { 
          $('.sticky-nav .collapse').collapse('show') 
        };
        $('#content').css("padding-top", "0");
//        setTimeout( function () {
//          var arrowHalfWidth3 = ($('.sticky-nav li.active').outerWidth() + 1)/2;
//        $('.sticky-nav li.active a .arrow').css({'border-left-width': arrowHalfWidth3 + 'px','border-right-width': arrowHalfWidth3 + 'px'}); }, 50);
      };
    }
  });

  $('.btn-2top').on ('click', ( function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, 400);
  }));

});