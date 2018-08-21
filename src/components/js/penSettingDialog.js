import $ from 'jquery';
import store from 'store';
import vs from '../../vs/core';

let watch;
let data = {

    HtmlDocType: 1,
    HtmlPreprocessor: 1,
    HtmlClassName: "",
    HtmlHeadStuff: "",
    CssPreprocessor: 1,
    CssBase: 1,
    CssVendorPrefix: "",
    CssExternal: "",
    JsPreprocessor: 1,
    JsExternal: "",
    urldata: ''
};



function getByStore() {
    let val, name;

    for (let o in data) {
        name = 'vs-' + o;
        val = store.get(name);   
        if (val !== undefined) {
            data[o] = val;
        }
    }
}


function makeWatchData() {
    let  fns = {};
    for (let o in data) {
        (function (o) {
            let name = 'vs-' +o;
            fns[o] = function (val, oval) {
                store.set(name, val);
            };
        }(o))
    }
    return fns;
}



getByStore();
watch = makeWatchData();


module.exports = {


    data() {

        return data;
    },

    methods: {

   
        //css快速添加引用
        quickAddCss: function () {

            var i;
            var links;
            var $textarea;
            var $that = $(event.currentTarget);
            var link = $that.val();
          
            if (link == "none") return;

            $textarea = $that.closest(".form-item").find("textarea");
            links = $.trim($textarea.val()).split("\n");

            for (i = 0; i < links.length; i++) {
                if (links[i] == link) return;
                if (links[i] == "") links.splice(i--, 1);
            }
            links.push(link);
            $textarea.val(links.join("\n"));
            data["CssExternal"] = $textarea.val();
        },

        //js快速添加引用
        quickAddJs: function (event) {
            var i;
            var links;
            var $textarea;
            var $that = $(event.currentTarget);
            var link = $that.val();

            if (link == "none") return;
        
            $textarea = $that.closest(".form-item").find("textarea");
            links = $.trim($textarea.val()).split("\n");

            for (i = 0; i < links.length; i++) {
                if (links[i] == link) return;
                if (links[i] == "") links.splice(i--, 1);
            }
            links.push(link);
            $textarea.val(links.join("\n"));
            data["JsExternal"] = $textarea.val();
        },
    
    },

    watch: watch,


    created() {
        var _this = this;
        //从浏览器路径获取参数
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        this.urldata = getQueryString('portalPath');
        // console.log(this.urldata);
        //默认加载项
        var baseCss = [
                this.urldata+'/assets/css/base.css',
                this.urldata+'/assets/css/public.css',
                this.urldata+'/assets/css/easyui.css',
                this.urldata+'/assets/css/form-common.css',
                this.urldata+'/assets/css/easyui-form.css',
                this.urldata+'/assets/js/libs/bootstrap-3.3.7/css/bootstrap.css'
            ],
            baseJs = [
                this.urldata+'/assets/seajs/sea.js',
                this.urldata+'/assets/js/libs/jquery-1.8.3.min.js',
            ];
        this.CssExternal = baseCss.join('\n');
        this.JsExternal = baseJs.join('\n');
    },
    mounted() {
        vs.penSettingVue = this;
        vs.penSettingVueData = this._data;
        vs.doRunByEditor(null, true);   //页面渲染后运行编辑器
    }
};