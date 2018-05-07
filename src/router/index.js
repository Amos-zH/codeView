import $ from 'jquery';
import store from 'store';
import vs from '../vs/vs.all';
import config from '../config';
import axios from 'axios';
import * as Theme from '../vs/theme';
import { setEditorValueAndRun, clearEditorStore } from '../vs/editor'
import layout from '../components/layout.vue';
import penSettingDialog from '../components/penSettingDialog.vue';

var title = "无标题的";

//转换模式
var convertMode = store.get("vs-convertMode") || "1";

//主题
var theme = Theme.getTheme();

//图片下载格式
var imgExt = store.get("vs-imgExt") || "png";

//父节点class name
var fatherClassName = store.get("vs-fatherClassName") || "brick";

//子节点class name
var sonClassName = store.get("vs-sonClassName") || "div";

//编辑器字体大小
var fontSize = config.editor.fontSize;

//组件
var components = {

    "layout": layout,
    "penSettingDialog": penSettingDialog
};

//数据
var data = {
    version: '',
    convertMode: convertMode,
    theme: theme,
    imgExt: imgExt,
    fatherClassName: fatherClassName,
    sonClassName: sonClassName,
    Title: title,

    CategoryItemsAll: [],
    CategoryItems: [],
    LabelItems: [],
    LabelItemsAll: [],

    Html: "",
    Css: "",
    Js: "",

    isShowBgMask:false,
    isShowSettingBox: false,
    isShowViewBox: false,
    layoutType: "ly1",
    fontSize: fontSize,

    sn:'',
    formName:'',
    sys: '',
    basePath:'',
    sessionId:'',
    id:'',
    systems: []
};

//方法
var methods = {

    //运行缓存
    runByCache: function () {
      

    },

    //下载图片
    downloadImg: function () {

      downloadImg();
    },

    //运行编辑器
    runEditor: function () {

        vs.doRunByEditor({}, true);
    },

    //设置笔记
    settingsPen: function () {

     
    },

    //保存笔记
    savePen: function () {

       
    },

    //新建笔记
    newPen: function () {

     
    },

    //清空笔记
    clearPen: function () {

        store.set("vs-title", "");
        clearEditorStore();
     
        
    },

    //设置笔记分类
    setCategory: function () {


    },

    //设置笔记标签
    setLabel: function () {


    },

    //快速添加引用
    quickAdd: function () {

      

    },

    //快速添加引用
    quickAdd2: function () {


    },

    hideSettingBox: function () {
        this.isShowBgMask = false;
        this.isShowSettingBox = false;
    },

    hideViewBox: function () {
        this.isShowBgMask = false;
        this.isShowViewBox =false;
    },

    showSettingBox: function () {

        this.isShowBgMask = true;
        this.isShowViewBox = true;
    },

    //设置
    setting: function () {

        this.isShowSettingBox = true;
    },

    //隐藏设置
    setttingBoxHide: function () {
      
        this.isShowSettingBox = false;
    },


    testCreate: function () {


    },
    getEditors:function () {
        return $(".web-editor:visible .vs-editor");
    },
    //在控制台打印HTML,CSS,JS代码
    saveCode: function () {
        var _json = [];
        var $editors = this.getEditors();
        /*获取html,css,js代码*/
        $editors.each(function () {
            var $this = $(this),
                type = $this.data("type"),
                value = store.get(type) || "";
            _json.push(type+'：'+value);
        });
        /*获取表单名称，SN，版本号*/
        var formName = this.formName,
            sn = this.sn,
            version = this.version,
            sys = this.sys;
        var saveObj = {name:formName, formSn:sn,systemSn:sys, versionNo:version, htmlContent:store.get('html'), cssContent:store.get('css'), jsContent:store.get('js')};

        $.ajax({
            url:this.basePath+'/portal/cms/biz_form_info/save.do?sessionId='+this.sessionId, data:saveObj, async:false, type:'POST', dataType:'JSON',
            success:function(dt){
                if(dt.responseCode == 1){
                    alert('保存成功！');
                }else{
                    alert('保存失败！');
                }

            }
        });

        console.log(saveObj);
        //_json.push('formName'+':'+formName,'SN'+':'+sn,'version'+':'+version,'SYS'+':'+sys);
        //console.log(JSON.stringify(_json));
    }
};



//vue初始化完成绑定事件
var mounted = function () {

    vs.indexVue = this;
    vs.indexVueData = this._data;
    vs.init();
};

//监听
var watch = {

    convertMode: function (val, oval) {
        store.set("vs-convertMode", val)
    },

    Title: function (val, oval) {
        store.set("vs-title", val)

    },
    fatherClassName: function (val, oval) {
        store.set("vs-fatherClassName", val);
    },

    sonClassName: function (val, oval) {
        store.set("vs-sonClassName", val);
    },
    imgExt: function (val, oval) {
        store.set("vs-imgExt", val);
    },

    theme: function (val,oval) {
        Theme.setTheme(val,oval)
    },

    fontSize: function (val, oval) {
   
        Theme.setFontSize(val)
    }
};


//初始化前
var beforeCreate = function () {

    Theme.setConfigByStore();
};


module.exports = {

    data() {
        return data;
    },

    methods: methods,

    watch: watch,

    mounted: function () {

        mounted.call(this)
    },

    //创建前回调函数
    beforeCreate: function () {

        beforeCreate.call(this);

    },

    created: function () {
        var _this = this;
        var dt = {
            "id": "8a949ee263248a950163248e04970003",
            "formType": 1,
            "name": "通知公告表单1.1.3",
            "formSn": "notice",
            "url": "www.taobao.com",
            "htmlContent": "<div class=\"w-msg-box\">\r\n        <div class=\"form-msg-header jsFormTitleTab\">\r\n            <ul class=\"msg-title\">\r\n                <li class=\" msg-title-tab tab-selected li-first\"><span>基本信息</span></li>\r\n                <li class=\" msg-title-tab li-second\"><span>材料信息</span></li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"form-tab-box jsTabBox\">\r\n            <div class=\"component\">\r\n                <label class=\"label-control\">材料计划编号：</label>\r\n                <input type=\"text\"  class=\"input-md\">\r\n            </div>\r\n            <div class=\"component\">\r\n                <label class=\"label-control\">编制日期：</label>\r\n                <input type=\"text\"  class=\"input-md\">\r\n            </div>\r\n            <div class=\"component\">\r\n                <label class=\"label-control\">编制人：</label>\r\n                <input type=\"text\" class=\"input-md\">\r\n            </div>\r\n            <div class=\"component component-address\">\r\n                <label class=\"label-control\">项目名称：</label>\r\n                <input type=\"text\" class=\"input-md\" value=\"asf2017-9-5\">\r\n                <input type=\"text\" class=\"input-lg ipt-double-right-lg\" value=\"杭州市上城区望江东路299号冠盛大厦\">\r\n            </div>\r\n            <div class=\"component\">\r\n                <label class=\"label-control\">条线：</label>\r\n                <input type=\"text\" class=\"input-md\">\r\n            </div>\r\n            <div class=\"component\">\r\n                <label class=\"label-control\">项目经理：</label>\r\n                <input type=\"text\" class=\"input-md\">\r\n            </div>\r\n            <div class=\"component\">\r\n                <label class=\"label-control\">审核状态：</label>\r\n                <input type=\"text\" class=\"input-md\">\r\n            </div>\r\n            <div class=\"component\">\r\n                <label class=\"label-control\">计划编号：</label>\r\n                <input type=\"text\" class=\"input-md\">\r\n            </div>\r\n            <div class=\"component component-wdouble\">\r\n                <label class=\"label-control\">备注：</label>\r\n",
            "jsContent": "console.log(12);",
            "cssContent": "css3",
            "systemSn": "222",
            "systemName": "权限系统",
            "sortNo": 300,
            "status": 1,
            "versionNo": "1.1.3",
            "createTime": "2018-05-03 13:55:47",
            "creator": "admin",
            "updateTime": "2018-05-03 20:04:36",
            "updator": "admin",
            "delFlag": 1
        };

        //_this.systems = response.data.systems;
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }

        _this.basePath = getQueryString('basePath');
        _this.sessionId = getQueryString('sessionId');
        _this.id = getQueryString('id');
        var url = _this.basePath+'/portal/cms/biz_form_info/getBizFormInfoById.do?sessionId='+_this.sessionId+'&id='+_this.id;
        $.ajax({url:url, data:{}, async:false,type:'POST', dataType:'JSON', success:function(response){
            if(response.code == 1){
                var dt = response.data;

                $.ajax({url:_this.basePath+'/portal/cms/biz_form_info/getAllICSystem.do?sessionId='+_this.sessionId, data:{}, dataType:'JSON', async:false,type:'POST', success:function (res) {
                    if(res.code == 1){
                        _this.systems = res.data;
                        _this.sys = dt.systemName;
                    }
                }});
                //_this.systems = [{id:'111', name:'门户系统'}, {id:'222', name:'权限系统'}];
                _this.htmlContent = dt.htmlContent;
                _this.sn = dt.formSn;
                _this.formName = dt.name;
                store.set('html', dt.htmlContent);
                store.set('css', dt.cssContent);
                store.set('js', dt.jsContent);
                _this.version = dt.versionNo;
            }
        }});
    },

    components: components
};