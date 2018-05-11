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
    JsExternal: ""
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
        quickAdd: function () {

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
        quickAdd2: function (event) {
            var i;
            var links;
            var $textarea;
            var $that = $(event.currentTarget);
            var link = $that.val();
        
            $textarea = $that.closest(".form-item").find("textarea");
            links = $.trim($textarea.val()).split("\n");

            for (i = 0; i < links.length; i++) {
                if (links[i] == link) return;
                if (links[i] == "") links.splice(i--, 1);
            }
            links.push(link);
            $textarea.val(links.join("\n"));

            data["JsExternal"] = $textarea.val();

            return false;

        },
    
    },

    watch: watch,


    created() {
        //默认加载项
        var baseCss = [
                'http://hometest.chinayasha.com/assets/css/base.css?v=1.2.0',
                'http://hometest.chinayasha.com/assets/css/public.css?v=1.2.0',
                'http://hometest.chinayasha.com/assets/css/easyui.css?v=1.2.0',
                'http://hometest.chinayasha.com/assets/css/form-common.css?v=1.2.0'
            ],
            baseJs = [
                'http://hometest.chinayasha.com/assets/seajs/sea.js'
            ];
        this.CssExternal = baseCss.join('\n');
        this.JsExternal = baseJs.join('\n');
    },
    mounted() {
        vs.penSettingVue = this;
        vs.penSettingVueData = this._data;
        vs.doRunByEditor(null, true);   //页面渲染后运行编辑器
    }
}