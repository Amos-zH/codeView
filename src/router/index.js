import $ from 'jquery';
import store from 'store';
import vs from '../vs/vs.all';
import config from '../config';
import * as Theme from '../vs/theme';
import { setEditorValueAndRun, clearEditorStore, getEditorValue } from '../vs/editor'
import layout from '../components/layout.vue';
import penSettingDialog from '../components/penSettingDialog.vue';
import Dialog from 'dialog';
import noty from 'noty';

const title = "无标题的";

const serverBasePath = "/oa/form";

//转换模式
const convertMode = store.get("vs-convertMode") || "1";

//主题
const theme = Theme.getTheme();

//图片下载格式
const imgExt = store.get("vs-imgExt") || "png";

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
    portalPath: '',
    sessionId:'',
    id:'',
    isReadOnly: true,

    //设置界面里的数据源
    isActive: '',
    dataSources: [],
    ifShow: false,
    dataDetaile: {
        id: '',
        title: '',
        className: '',
        method: '',
        version: '',
        remark: ''
    },
    requestData: '',
    requestResult: '',
    interRow: ''
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
    quickAddCss: function () {
    },

    //快速添加引用
    quickAddJs: function () {
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

    validate:function(){
        let _this = this,
            truth = true;
        /*// 判断必填项
        if(!_this.formName){
            noty({
                text: '请输入表单名称！',
                type: "error",
                timeout: 3000
            });
            return false;
        }
        if(!_this.sn){
            noty({
                text: '请输入表单SN！',
                type: "error",
                timeout: 3000
            });
            return false;
        }
        return true;*/
        Object.keys(this.dataDetaile).forEach(function (key) {
            if (key!='id' && _this.dataDetaile[key] == '') {
                truth = false;
            }
        });
        return truth;
    },

    // 保存数据到服务器
    saveData:function(flag, datas){
        var _this = this;
        /*获取表单名称，SN，版本号.获取html,css,js代码*/
        var saveObj = {isPublish:flag,id:this.id,name:_this.formName, formSn:_this.sn,systemSn:_this.sys, versionNo:_this.version, htmlContent:datas.html, cssContent:datas.css, jsContent:datas.javascript};
        $.ajax({
            url:this.basePath+serverBasePath+'/biz_form_info/save.do?sessionId='+this.sessionId, data:saveObj, async:false, type:'POST', dataType:'JSON',
            success:function(dt){
                if(dt.code == 1){
                    noty({
                        text: '保存成功！',
                        type: "success",
                        timeout: 3000
                    });
                    if(dt.data){
                        _this.id = dt.data.id;
                    }
                }else{
                    noty({
                        text: dt.msg,
                        type: "error",
                        timeout: 3000
                    });
                }

            }, error:function () {
                noty({
                    text: '保存失败！',
                    type: "error",
                    timeout: 3000
                });
            }
        });
    },

    //保存表单
    saveCode: function () {
        /*if(!_this.validate()){
            return;
        }*/
        let valData = getEditorValue();
        this.saveData(0, valData);
    },

    //发布表单
    publishCode:function () {
        let _this = this;
        /*if(!_this.validate()){
            return;
        }*/
        let pubDialog = Dialog({
            title: "发布表单",
            content: $("#dialog-confirm"),
            padding: "20px 30px ",
            className: "dialog-settings",
            showClassName:"dialog-show",
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            ok: function(){
                /*获取表单名称，SN，版本号.获取html,css,js代码*/
                _this.saveData(1, getEditorValue());
            },
            close: function () {
                pubDialog.hide();
                return false;
            }
        });
    },

    //初始化数据源
    initDataSource () {
        let _this = this;
        let initDataUrl = this.basePath+serverBasePath+'/biz_form_data/ajaxList.do?sessionId='+this.sessionId+'&formSn='+this.sn;
        $.ajax({ url:initDataUrl, data:{}, async: false, type: 'POST', dataType: 'JSON',
            success:function (response) {
                _this.dataSources = response;
            }
        });
    },

    //添加一条数据源
    interAdd () {
        //清空接口详情
        Object.keys(this.dataDetaile).forEach(key => this.dataDetaile[key]= '');
        //显示接口详情
        this.ifShow = true;
    },

    //保存接口，并初始化数据源，再清空接口详情
    interSave () {
        //必填验证
        if(!this.validate()){
            noty({
                text: '保存失败！请填写完整！',
                type: "error",
                timeout: 3000
            });
            return;
        }
        let newObj = Object.assign({}, this.dataDetaile, );
        //保存接口详情
        let saveInterUrl = this.basePath+serverBasePath+'/biz_form_data/save.do?sessionId='+this.sessionId+'&formSn='+this.sn;
        let saveInterObj = newObj;
            //本地使用，添加到数据源
            //this.dataSources.push(newObj);
        $.ajax({ url:saveInterUrl, data:saveInterObj, async:false, type:'POST', dataType:'JSON',
            success:function (response) {
                if(response.code == 1){
                    noty({
                        text: '保存成功！',
                        type: "success",
                        timeout: 3000
                    });
                }else{
                    noty({
                        text: response.msg,
                        type: "error",
                        timeout: 3000
                    });
                }
            }, error:function () {
                noty({
                    text: '保存失败！',
                    type: "error",
                    timeout: 3000
                });
            }
        });
        //初始化数据源
        this.initDataSource();
        //清空接口详情
        Object.keys(this.dataDetaile).forEach(key => this.dataDetaile[key]= '');
    },

    //点击数据源列表显示接口详情
    showInterDetail (dataList, index) {
        this.isActive = index;
        let _this = this.dataDetaile;
        _this.id = dataList.id;
        _this.title = dataList.title;
        _this.className = dataList.className;
        _this.method = dataList.method;
        _this.version = dataList.version;
        _this.remark = dataList.remark;
        this.ifShow = true;
    },

    //测试数据源
    interTest (row) {
        this.interRow = row;
        this.requestData = '';
        this.requestResult = '';
        let interDialog = Dialog({
            title: "测试",
            content: $("#dialog-interTest"),
            padding: "20px",
            className: "dialog-settings",
            showClassName:"dialog-show",
            resizable: false,
            height: "auto",
            width: 600,
            modal: true,
            lock:true,
            close: function () {
                interDialog.hide();
                return false;
            }
        });
    },

    //测试弹窗测试参数
    interTestBtn () {
        let _this = this;
        let testUrl = this.portalPath + '/common/doApiData.jhtml';
        let datas = {
            id: this.dataSources[this.interRow].id,
            className: this.dataSources[this.interRow].className,
            method: this.dataSources[this.interRow].method,
            version: this.dataSources[this.interRow].version,
            params: this.requestData
        };
        $.ajax({ url:testUrl, data:datas, async:false, type:'POST', dataType:'JSONP', jsonp : "jsoncallback",
            success:function (response) {
                console.info(response);
                _this.requestResult = JSON.stringify(response);
                //return;
                if(response.code == 1){
                    noty({
                        text: response.msg,
                        type: "success",
                        timeout: 3000
                    });
                    _this.requestResult = response.data;
                }else{
                    noty({
                        text: response.msg,
                        type: "error",
                        timeout: 3000
                    });
                }
            },error:function (XMLHttpRequest) {
                noty({
                    text: XMLHttpRequest.status+' '+'，服务器异常，请稍后再试',
                    type: "error",
                    timeout: 3000
                });
            }
        });
    },

    //删除数据源
    interDel (row) {
        let _this = this;
        let interDialog = Dialog({
            title: "删除数据源",
            content: $("#dialog-interDel"),
            padding: "20px",
            className: "dialog-settings",
            showClassName:"dialog-show",
            resizable: false,
            height: "auto",
            width: 300,
            modal: true,
            ok: function () {
                let delDataUrl = _this.basePath+serverBasePath+'/biz_form_data/dels.do?sessionId='+_this.sessionId+'&ids='+_this.dataSources[row].id;
                $.ajax({ url:delDataUrl, data:{}, async: false, type: 'POST', dataType: 'JSON',
                    success:function (response) {
                        if(response.code == 1){
                            noty({
                                text: response.msg,
                                type: "success",
                                timeout: 3000
                            });
                        }else{
                            noty({
                                text: response.msg,
                                type: "error",
                                timeout: 3000
                            });
                        }
                        //初始化数据
                        _this.initDataSource();
                    }
                });
                //本地调试用
                //_this.dataSources.splice(row, 1);
            },
            close: function () {
                interDialog.hide();
                return false;
            }
        });
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
        //用保存'saveCode'事件代替浏览器自带的'ctrl+s'事件
        document.onkeydown=function (e) {
            e=window.event||e;
            var key=e.keyCode;
            if(key== 83 && e.ctrlKey){
                /*延迟，兼容FF浏览器  */
                setTimeout(function(){
                    // alert('ctrl+s');
                    _this.saveCode();
                },1);
                return false;
            }
        };

        //从浏览器路径获取参数
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        _this.basePath = getQueryString('basePath');
        _this.portalPath = getQueryString('portalPath');
        _this.sessionId = getQueryString('sessionId');
        _this.id = getQueryString('id');

        //当ID为空时SN可以修改，否则不能修改
        if(_this.id == '' || _this.id == undefined) {
            _this.isReadOnly = false;
        }

        //初始化页面
        var url = _this.basePath+serverBasePath+'/biz_form_info/getBizFormInfoById.do?sessionId='+_this.sessionId+'&id='+_this.id;
        $.ajax({url:url, data:{}, async:false,type:'POST', dataType:'JSON', success:function(response){
            if(response.code == 1){
                let dt = response.data;
                _this.htmlContent = dt.htmlContent;
                _this.sn = dt.formSn;
                _this.id = dt.id;
                _this.formName = dt.name;
                _this.version = dt.versionNo;
                _this.sys = dt.systemName;
                setTimeout(function(){
                    clearEditorStore();
                    setEditorValueAndRun({html:dt.htmlContent, css:dt.cssContent, javascript:dt.jsContent});
                }, 1000);
            }
        }, error:function (XMLHttpRequest) {
                noty({
                    text: XMLHttpRequest.status+' '+'服务器异常，请稍后再试',
                    type: "error",
                    timeout: 3000
                });
        }});

        //初始化设置页面的数据源
        this.initDataSource();
    },

    components: components
};