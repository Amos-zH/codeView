<template>

  <div id="app" oncontextmenu="event.returnValue=false" onselectstart="event.returnValue=false">


    <div id="editor-container" class="editor-container">

      <symbol id="gear" viewBox="0 0 100 100">
        <path d="M87.687 45.077c-.313-2.433-.816-4.807-1.542-7.079l8.145-11.73-5.827-7.515-.094-.123-5.824-7.514-12.955 5.577c-2.041-1.265-4.192-2.362-6.459-3.219L59.42 0H40.586l-3.709 13.474c-2.27.857-4.421 1.955-6.463 3.222l-12.957-5.577-5.825 7.514-.097.124-5.822 7.517 8.146 11.731a39.832 39.832 0 0 0-1.544 7.079L0 52.032l2.08 9.375.033.15 2.08 9.375 14.001.761a39.157 39.157 0 0 0 4.4 5.668l-2.396 14.227 8.416 4.173.138.067L37.169 100l9.309-10.796c1.161.109 2.335.173 3.524.173s2.358-.074 3.52-.184l9.317 10.804 8.415-4.173.141-.066 8.413-4.172-2.396-14.228a39.06 39.06 0 0 0 4.4-5.672l14-.759 2.078-9.375.035-.154L100 52.025l-12.313-6.948zM50.003 34.51c8.435 0 15.272 7.035 15.272 15.719 0 8.679-6.839 15.717-15.272 15.717-8.436 0-15.272-7.038-15.272-15.717 0-8.684 6.838-15.719 15.272-15.719z"></path>
      </symbol>



      <header class="header" style="min-width: 1250px;">

        <div class="title-box">
          <div id="title-text" class="title-text" style="display: inline;">
            <!--<label>表单名称：<input v-model="formName" type="text" id="title-ipt" placeholder="输入表单名称" class="tit-ipt focus" name="formName"></label>-->
            <label>表单名称：<span id="title-ipt" class="head-text" name="formName">{{ formName }}</span></label>
            <!--<label>SN：<input v-model="sn" type="text" id="title-sn" placeholder="输入" class="tit-ipt focus" name="sn" :readonly="isReadOnly" :style="[{background:isReadOnly ? '#e5e5e5' : '#fff'}]"></label>-->
            <label>SN：<span id="title-sn" class="head-text" name="sn" >{{ sn }}</span></label>
            <label>所属系统：<span class="head-text" name="" >{{ sys }}</span></label>
          </div>
          <!--<div style="display: inline-block;vertical-align: top;">
            所属系统：
            <select name="" v-model="sys" style="height:32px;line-height:32px;width:200px;">
              <option :value="item.name" v-for="item in systems">{{ item.name }}</option>
            </select>
          </div>-->
        </div>

        <div class="action-box">

          <a href="javascript:void(0);" @click="runEditor"  class="btn">执行</a>
        
          <!--<a href="javascript:;" v-on:click="clearPen" class="btn">清空</a>-->

          <a href="javascript:void(0);" @click="showSettingBox" class="btn view-btn">视图</a>

          <a href="javascript:void(0);" @click="setting" class="btn">设置</a>

          <a href="javascript:void(0);" @click="saveCode" class="btn">保存</a>

          <a href="javascript:void(0);" @click="publishCode" class="btn">发布</a>
          <div class="penSettingBox" style="display: none;">
            <p id="dialog-confirm">此操作将会发布到正式环境，并增加一个版本号，确定吗？</p>
          </div>
          <!-- 视图栏弹出 -->
          <div class="view-box" id="view-box" v-bind:class="{ active: isShowViewBox }">
            <div class="view-wrap">

              <div class="view-list">

                <div class="s-view s-view1">

                  <div class="iboxs s-rows">

                    <div class="ibox s-cols">
                      <i class="ibox s-code i-ac">
                      </i>
                      <i class="ibox s-code i-ac">
                      </i>
                      <i class="ibox s-code i-ac">

                      </i>
                    </div>

                    <div class="ibox s-result i-ac">

                    </div>
                  </div>

                </div>

                <div class="s-view s-view2" style="display:none">

                  <div class="iboxs s-rows">
                    <div class="ibox s-result i-ac">
                    </div>
                    <div class="ibox s-cols">
                      <i class="ibox s-code i-ac">
                      </i>
                      <i class="ibox s-code i-ac">
                      </i>
                      <i class="ibox s-code i-ac">
                      </i>
                    </div>


                  </div>

                </div>

                <div class="s-view s-view3">
                  <div class="iboxs s-rows">
                    <div class="ibox s-menu i-ac">
                    </div>
                    <div class="ibox s-code i-ac">
                    </div>
                  </div>
                </div>

                <div class="s-view s-view4">
                  <div class="iboxs s-rows">
                    <div class="ibox s-rows">
                      <div class="ibox s-menu i-ac">
                      </div>
                      <div class="ibox s-code i-ac">
                      </div>
                    </div>
                    <div class="ibox s-result i-ac">
                    </div>
                  </div>
                </div>

                <div class="s-view s-view5">

                  <div class="iboxs s-cols">

                    <div class="ibox s-result i-ac">

                    </div>

                    <div class="ibox s-rows">
                      <div class="ibox s-menu i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>

                    </div>

                  </div>

                </div>

                <div class="s-view s-view6" style="display:none">

                  <div class="iboxs s-cols">
                    <div class="ibox s-rows">
                      <div class="ibox s-menu i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>

                    </div>
                    <div class="ibox s-result i-ac">

                    </div>



                  </div>

                </div>

                <div class="s-view s-view7">

                  <div class="iboxs s-cols">

                    <div class="ibox s-result i-ac">

                    </div>
                    <div class="ibox s-rows">
                      <div class="ibox  s-code i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>
                    </div>


                  </div>

                </div>

                <div class="s-view s-view8">

                  <div class="iboxs s-cols">
                    <div class="ibox s-rows">
                      <div class="ibox  s-code i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>
                    </div>

                    <div class="ibox s-result i-ac">

                    </div>


                  </div>

                </div>



              </div>

            </div>
          </div>
        </div>

      </header>

      <div class="page-wrap" id="page-wrap">
        <layout></layout>
        
        <div class="bg-mask" v-on:click="hideViewBox" v-bind:class="{ show: isShowBgMask }"></div>
      </div>

      <div class="setting-box" id="settingBox" v-bind:class="{ show: isShowSettingBox }">

        <div class="hd">
          <h2>设置</h2>
          <a href="javascript:;" v-on:click="setttingBoxHide" class="off">
            <i class="ft-x font-medium-3"></i>
          </a>
        </div>
        <div class="bd">

          <div class="set-box">

            <div class="form-item">
              <h4>
                编辑器字体大小
              </h4>

              <select  v-model="fontSize" class="select-control">
                <option value="11">11px</option>
                <option value="12">12px</option>
                <option value="13">13px</option>
                <option value="14">14px</option>
                <option value="15">15px</option>
                <option value="16">16px</option>
                <option value="17">17px</option>
                <option value="18">18px</option>
                <option value="19">19px</option>
                <option value="20">20px</option>
                <option value="21">21px</option>
                <option value="22">22px</option>
                <option value="23">23px</option>
                <option value="24">24px</option>
              </select>
            </div>

            <div class="form-item">
              <h4>
                编辑器主题
              </h4>

              <div class="item-list">
                <div class="form-check-inline">
                  <div class="custom-control custom-radio">
                    <input type="radio" id="themeRadio1" checked="checked" name="themeRadio" class="custom-control-input" value="theme-gray" v-model="theme"  />
                    <label class="custom-control-label" for="themeRadio1">灰</label>
                  </div>
                </div>
                <div class="form-check-inline">
                  <div class="custom-control custom-radio">
                    <input type="radio" id="themeRadio2" name="themeRadio" class="custom-control-input" value="theme-black" v-model="theme" />
                    <label class="custom-control-label" for="themeRadio2">黑</label>
                  </div>
                </div>
                <div class="form-check-inline">
                  <div class="custom-control custom-radio">
                    <input type="radio" id="themeRadio3" name="themeRadio" class="custom-control-input" value="theme-blue" v-model="theme" />
                    <label class="custom-control-label" for="themeRadio3">深蓝</label>
                  </div>
                </div>
              </div>

            </div>

            <div class="form-item">
              <h4>数据源</h4>

              <ul>
                <li class="list-input" :class="{ interActive:isActive === index }" v-for="(item, index) in dataSources" @click="showInterDetail(item, index)" :title="item.title">
                  <span>{{ item.title }}</span>
                  <div style="float: right;">
                    <button type="button" @click="interTest(index)" style="cursor: pointer;">测试</button>
                    <button type="button" @click.stop="interDel(index)" style="cursor: pointer;">删除</button>
                  </div>
                </li>
                <li class="list-input hover-btn add-btn" @click="interAdd">+</li>
              </ul>

              <!-- 测试弹窗Start -->
              <div class="penSettingBox" style="display: none;">
                <div id="dialog-interTest">
                  <div>
                    <p class="item-text">请求参数：</p>
                    <textarea class="item-textarea" cols="30" rows="8" v-model="requestData"></textarea>
                  </div>
                  <a href="javascript:void(0);" class="common-btn" @click="interTestBtn" style="margin: 10px 0;width: 200px;">测试</a>
                  <div>
                    <p class="item-text">响应结果：</p>
                    <textarea class="item-textarea" cols="30" rows="8" v-model="requestResult"></textarea>
                  </div>
                </div>
              </div>
              <!-- 测试弹窗End -->
              <!-- 删除弹窗Start -->
              <div class="penSettingBox" style="display: none;">
                <p id="dialog-interDel">确定删除本条数据源吗？</p>
              </div>
              <!-- 删除弹窗End -->
            </div>

            <div class="form-item" v-show="ifShow">
              <h4>接口详情</h4>

              <form action="">
                <label class="list-block">
                  标题：
                  <input type="text" class="list-input" v-model="dataDetaile.title">
                </label>
                <label class="list-block">
                  接口名：
                  <input type="text" class="list-input" v-model="dataDetaile.className">
                </label>
                <label class="list-block">
                  方法名：
                  <input type="text" class="list-input" v-model="dataDetaile.method">
                </label>
                <label class="list-block">
                  版本号：
                  <input type="text" class="list-input" v-model="dataDetaile.version">
                </label>
                <label>
                  备注：
                  <textarea class="list-input" v-model="dataDetaile.remark" cols="30" rows="4" style="resize: none;"></textarea>
                </label>
                <a href="javascript:void(0);" class="common-btn" @click="interSave">保存</a>
              </form>
            </div>

          </div>

        </div>
      </div>

      <div class="bg-mask" v-on:click="hideSettingBox" v-bind:class="{ show: isShowBgMask }"></div>

      <footer class="footer cf">
        <div class="version">
          版本：{{version}}
        </div>
      </footer>

    </div>

    <!-- 弹窗 -->
    <penSettingDialog></penSettingDialog>

  </div>

</template>

<script>

  import index from "./router/index";

  export default  index

</script>


