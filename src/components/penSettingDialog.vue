<template>
  <div class="penSettingBox" style="display:none">
    <div class="pen-settings" id="pen-settings" >
      <div class="wrap">
        <div class="tab">
          <nav class="tab-menus">
            <a class="active" href="javascript:;" id="html-menu">
              Html
            </a>
            <a href="javascript:;" id="css-menu">
              Css
            </a>
            <a href="javascript:;"  id="js-menu">
              Javascript
            </a>
          </nav>
          
          <form id="form-settings">
            <div class="tab-cts">
              <div class="tab-ct active">
                <div class="form-item">
                  <h4 class="form-tit">
                    Html 文档类型
                  </h4>
                  <div class="form-ct">
                    <select name="HtmlDocType" v-model="HtmlDocType" class="j-insubmit">
                      <option value="1">
                        Html5 模式
                      </option>
                      <option value="2">
                        HTML 4.01 严格模式
                      </option>
                      <option value="3">
                        HTML 4.01 过度模式
                      </option>
                      <option value="4">
                        HTML 4.01 框架模式
                      </option>
                      <option value="5">
                        XHTML 1.0 严格模式
                      </option>
                      <option value="6">
                        XHTML 1.0 过渡模式
                      </option>
                      <option value="7">
                        XHTML 1.0 框架模式
                      </option>
                      <option value="8">
                        XHTML 1.1 严格模式
                      </option>
                    </select>
                  </div>
                </div>


                <div class="form-item">

                  <h4 class="form-tit">
                    Html 样式名称
                  </h4>
                  <div class="form-ct">
                    <input type="text" name="HtmlClassName" v-model="HtmlClassName" placeholder="class" class="j-insubmit" />
                  </div>
                </div>
                <div class="form-item">
                  <h4 class="form-tit">
                    Html head 头部
                  </h4>
                  <div class="form-ct">
                    <textarea name="HtmlHeadStuff" v-model="HtmlHeadStuff" class="j-insubmit" placeholder="&lt;meta&gt; or &lt;link&gt; or &lt;script&gt;">
                    </textarea>
                  </div>
                </div>
              </div>

              <div class="tab-ct">
                <div class="form-item">
                  <h4 class="form-tit">
                    Css 模式
                  </h4>
                  <div class="form-ct">
                    <select name="CssPreprocessor" v-model="CssPreprocessor" class="j-insubmit">
                      <option value="1">
                        None
                      </option>
                      <option value="2">
                        Scss
                      </option>
                      <option value="3">
                        Less
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-item">
                  <h4 class="form-tit">
                    Css Base
                  </h4>
                  <div class="form-ct">

                    <div>
                      <label>
                        <input type="radio" checked="checked" name="cssbase" value="1"  v-model="CssBase"/> None
                      </label>
                      <label>
                        <input type="radio" name="cssbase" value="2"  v-model="CssBase"/> normalize.css
                      </label>
                      <label>
                        <input type="radio" name="cssbase" value="3"  v-model="CssBase"/> reset.css
                      </label>

                    </div>

                  </div>
                </div>

                <div class="form-item">
                  <h4 class="form-tit">
                    Css 引用
                  </h4>
                  <div class="form-ct">
                    <textarea name="CssExternal" v-model="CssExternal" placeholder="&lt;link&gt;" class="j-insubmit">
                    </textarea>
                  </div>
                  <h4 class="form-tit">
                    快速添加
                  </h4>
                  <div class="form-c cf quick-add-box">
                    <select id="css-quick-add" class="quick-add-select" v-on:change="quickAdd">
                      <option value="none">---</option>
                      <option value="http://hometest.chinayasha.com/assets/css/base.css?v=1.2.0">base.css</option>
                      <option value="http://hometest.chinayasha.com/assets/css/public.css?v=1.2.0">public.css</option>
                      <option value="http://hometest.chinayasha.com/assets/css/easyui.css?v=1.2.0">easyui.css</option>
                      <option value="http://hometest.chinayasha.com/assets/css/form-common.css?v=1.2.0">form-common.css</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="tab-ct">
                <div class="form-item">
                  <h4 class="form-tit">
                    Javascript 模式
                  </h4>
                  <div class="form-ct">
                    <select name="JsPreprocessor" v-model="JsPreprocessor" class="j-insubmit">
                      <option value="1">
                        None
                      </option>
                    </select>
                  </div>
                </div>
                
                <div class="form-item">
                  <h4 class="form-tit">
                    Javascript 引用
                  </h4>
                  <div class="form-ct">
                    <textarea name="JsExternal" v-model="JsExternal"   placeholder="&lt;script&gt;" class="j-insubmit">
                    </textarea>
                  </div>
                  <h4 class="form-tit">
                    快速添加
                  </h4>
                  <div class="form-c cf quick-add-box">
                    <select id="js-quick-add" class="quick-add-select" v-on:change="quickAdd2">
                      <option value="none">---</option>
                      <option value="http://hometest.chinayasha.com/assets/seajs/sea.js">sea.js</option>
                    </select>
                  </div>

                  <!--<div class="form-c cf quick-select">
                    <a data-src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" v-on:click="quickAdd2" href="javascript:;">
                      jQuery
                    </a>
                  </div>-->
                </div>

              </div>

          
            </div>
          </form>

        </div>



      </div>


    </div>

    
  </div>

</template>




<script>

  export default from "./js/penSettingDialog";

</script>