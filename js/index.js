/*
* @Author: Administrator
* @Date:   2018-03-30 17:43:38
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-11 18:10:02
*/

/*var weather;
// 请求吕梁天气情况的数据
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=吕梁",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
         weather=obj.data.weather;
         console.log(weather);
	}
})*/

var city;
// 请求各城市的数据
$.ajax({
   url:"https://www.toutiao.com/stream/widget/local_weather/city/",
   dataType:"jsonp",
   type:"get",
   success:function(obj){
         city=obj.data;
         renderCity(city);
         // console.log(city);
   }
})





function renderCity(city){
   // 渲染省会
   for(var k in city){
      // console.log(k);
      var provin=document.createElement("div");
      provin.className="l_cityt";
      provin.innerHTML=k;
      var city_box=document.querySelector(".l_cityz");
      city_box.appendChild(provin);
      
      var content=document.createElement("ul");
      content.className="l_cityz";
      city_box.appendChild(content);
      for(var y in city[k]){
         var son=document.createElement("li");
         son.className="span";
         son.innerHTML=y;
         content.appendChild(son);

      }
      
   }
}
// 渲染数据
function updata(weather){
	// console.log(weather);
   // 指定城市
   var cityName=document.querySelector(".city");
   cityName.innerHTML=weather.city_name;

   // 当前温度
   var currentTemperature=document.querySelector(".tamputer");
   currentTemperature.innerHTML=weather.current_temperature+"°";
   
   // 当前天气情况
   var currentCondition=document.querySelector(".condition");
   currentCondition.innerHTML=weather.current_condition;
   
   // 第二部分 今明两天天气情况
   // 今天天气情况
   var dat_high_temperature=document.querySelector("#dat_high_temperature");
   dat_high_temperature.innerHTML=weather.dat_high_temperature;
   
   var dat_low_temperature=document.querySelector("#dat_low_temperature");
   dat_low_temperature.innerHTML=weather.dat_low_temperature+"°";

   var day_condition=document.querySelector("#dat_condition");
   day_condition.innerHTML=weather.day_condition;

   var day_pic=document.querySelector("#dat_weather_icon_id");
   // 改变的是行内样式
   day_pic.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;
   //明天天气情况
   var tomorrow_high_temperature=document.querySelector("#tomorrow_high_temperature");
   tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
   
   var tomorrow_low_temperature=document.querySelector("#tomorrow_low_temperature");
   tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature+"°";

   var tomorrow_condition=document.querySelector("#tomorrow_condition");
   tomorrow_condition.innerHTML=weather.tomorrow_condition;

   var tomorrow_weather_icon_id=document.querySelector("#tomorrow_weather_icon_id");
   tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;
    
   // 声明变量是字符串类型
   var str="";
   // 循环  es6  模板字符串
   weather.hourly_forecast.forEach((item,index)=>{
      str=str+`
        <div class="now">
          <h2 class="now_time">${item.hour}:00</h2>
          <div class="now_icon" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
          <h2 class="now_temp">${item.temperature}°</h2>
        </div>
      `
   })
   // 
   $(".wrap").html(str);
    

  var str2="";
  weather.forecast_list.forEach((item,index)=>{
    console.log(item,index);
    str2=str2+`
      <div class="con">
        <div class="con_date">
          ${item.date.slice(5,7)}/${item.date.slice(8)}
        </div>
        <div class="con_weaH">${item.condition}</div>
        <div class="con_picH" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
        <div class="con_high">${item.high_temperature}</div>
        <div class="con_low">${item.low_temperature}</div>
        <div class="con_wind">${item.wind_direction}</div>
        <div class="con_level">${item.wind_level}</div>
      </div>
    `
  })
  $(".wrap1").html(str2);


    


   


}
// 形参
function AJAX(str){
   let url = `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
   $.ajax({
      url:url,
      dataType:"jsonp",
      type:"get",
      success:function(obj){
        var weather=obj.data.weather;
        console.log(weather);
        updata(weather);
        $(".location").css({"display":"none"});
        $(".miss").addClass('block');

      }
   })
}
window.onload=function(){
	// updata();
   $(".span").on("click",function(){
        console.log(this.innerHTML)
         var cityh=this.innerHTML;
         // 实参
         AJAX(cityh);
   })


   // 点击城市名时，城市页面出现
   $(".l_city").on("click",function(){
      $(".location").css({"display":"block"});
   })
   //点击首页，城市页面出现
   $("header").on("click",function(){
      $(".location").css({"display":"block"});
   })
   // 点击城市名时，城市页面出现
    $(".l_cityz").on("click",function(){
      $(".location").css({"display":"block"});
   })
   // 当input获取焦点后，按钮的内容变确认
   $("input").on("focus",function(){
       $(".sear_right").html("确认");
   })

   // 操作按钮  分为确认与取消
   var button=document.querySelector(".sear_right");
   console.log(button);
   button.onclick=function(){
      var text=button.innerHTML;

      // 判断
      if(text=="取消"){
         $(".location").css({"display":"none"});
      }
      else{
         var str1=document.querySelector("input").value;

         for(var i in city){
           for(var j in city[i]){
             if(str1==j){
                AJAX(str1);
                return;
             }
           }
         }
         alert("没有该城市天气");
      }
   }
}