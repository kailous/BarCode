// 默认条形码值的映射对象
var defaultValues = {
  CODE128 : "Example 1234",
  CODE128A : "EXAMPLE",
  CODE128B : "Example text",
  CODE128C : "12345678",
  EAN13 : "1234567890128",
  EAN8 : "12345670",
  UPC : "123456789999",
  CODE39 : "EXAMPLE TEXT",
  ITF14 : "10012345000017",
  ITF : "123456",
  MSI : "123456",
  MSI10 : "123456",
  MSI11 : "123456",
  MSI1010 : "123456",
  MSI1110 : "123456",
  pharmacode : "1234"
};

// 当文档准备就绪时执行以下代码
$(document).ready(function(){
  // 当用户输入框的输入发生变化时，调用newBarcode函数
  $("#userInput").on('input', newBarcode);
  
  // 当选择条形码类型的下拉菜单发生变化时，设置用户输入框的值为对应的默认值，并调用newBarcode函数
  $("#barcodeType").change(function(){
      $("#userInput").val( defaultValues[$(this).val()] );
      newBarcode();
  });

  // 点击文本对齐按钮时，切换选中状态，调用newBarcode函数
  $(".text-align").click(function(){
    $(".text-align").removeClass("btn-primary");
    $(this).addClass("btn-primary");
    newBarcode();
  });

  // 点击字体选项按钮时，切换选中状态，调用newBarcode函数
  $(".font-option").click(function(){
    if($(this).hasClass("btn-primary")){
      $(this).removeClass("btn-primary");
    }
    else{
      $(this).addClass("btn-primary");
    }
    newBarcode();
  });

  // 点击显示文本按钮时，切换选中状态，根据状态展开或收起字体选项，调用newBarcode函数
  $(".display-text").click(function(){
    $(".display-text").removeClass("btn-primary");
    $(this).addClass("btn-primary");
    if($(this).val() == "true"){
      $("#font-options").slideDown("fast");
    }
    else{
      $("#font-options").slideUp("fast");
    }
    newBarcode();
  });

  // 当字体选择框的值发生变化时，设置文本框的字体样式，调用newBarcode函数
  $("#font").change(function(){
    $(this).css({"font-family": $(this).val()});
    newBarcode();
  });

  // 初始化滑动条控件，并在滑动或滑动结束时调用newBarcode函数
  $('input[type="range"]').rangeslider({
      polyfill: false,
      rangeClass: 'rangeslider',
      fillClass: 'rangeslider__fill',
      handleClass: 'rangeslider__handle',
      onSlide: newBarcode,
      onSlideEnd: newBarcode
  });

 // 初始化颜色选择器
$('.color').colorPicker({
  // 当用户选择颜色后，调用renderCallback中指定的函数，即newBarcode函数
  renderCallback: newBarcode
});

  // 初次加载页面时执行newBarcode函数
  newBarcode();
});

// 定义newBarcode函数
var newBarcode = function() {
  // 将用户输入的值生成为条形码
  $("#barcode").JsBarcode(
      $("#userInput").val(),
      {
        "format": $("#barcodeType").val(),
        "background": $("#background-color").val(),
        "lineColor": $("#line-color").val(),
        "fontSize": parseInt($("#bar-fontSize").val()),
        "height": parseInt($("#bar-height").val()),
        "width": $("#bar-width").val(),
        "margin": parseInt($("#bar-margin").val()),
        "textMargin": parseInt($("#bar-text-margin").val()),
        "displayValue": $(".display-text.btn-primary").val() == "true",
        "font": $("#font").val(),
        "fontOptions": $(".font-option.btn-primary").map(function(){return this.value;}).get().join(" "),
        "textAlign": $(".text-align.btn-primary").val(),
        "valid":
          function(valid){
            if(valid){
              $("#barcode").show();
              $("#invalid").hide();
            }
            else{
              $("#barcode").hide();
              $("#invalid").show();
            }
          }
      });

  // 更新页面上的条形码属性显示
  $("#bar-width-display").text($("#bar-width").val());
  $("#bar-height-display").text($("#bar-height").val());
  $("#bar-fontSize-display").text($("#bar-fontSize").val());
  $("#bar-margin-display").text($("#bar-margin").val());
  $("#bar-text-margin-display").text($("#bar-text-margin").val());
};