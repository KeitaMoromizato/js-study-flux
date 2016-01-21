# JavaScript勉強会 #flux

## コンテンツ
* flux概要
* Redux
* サンプル
* 設計時に気をつけるポイント


## はじめに
[fluxのoverview](https://facebook.github.io/flux/docs/overview.html)にもある通り、fluxは単方向データフローのアーキテクチャです。

> Flux eschews MVC in favor of a unidirectional data flow. 

flux自体はただの思想で、世の中にはfluxの思想を取り入れた実装が数多く存在します。今回はその中でも2016年1月現在で最も支持を集めているReduxに触れてみます。

「単方向データフローのアーキテクチャ」と言われてピンと来る人も少ないと思うので、歴史から追っていきましょう。

## JavaScriptの歴史
もともとJavaScriptと言えば、Webサイトに動きを付ける程度のものでした。それがajaxや近年のSingle Page Applicationの盛り上がりにより、
「データを保持する」必要が出てきました。

### jQuery時代
jQueryやBackbone.jsの全盛期、「ajaxでデータを取得してViewを更新する」ような処理は以下のような流れで行われました。

```js
$.ajax({
  url: 'http://example.com/item/list',
  success: function(data) {
    var items = data.items;
    for (var item in items) {
      $('#items').append('<li>' + item.name + '</li>');
    }
  }
});
```

ajaxによるデータ取得といった任意のタイミングで、プログラマ自身がDOMの値を書きかえていました。
一見分かりやすいようにも見えますが、実際のデータとDOMの状態の同期をとるのはプログラマ自身であり、
「データが追加されたけどDOMを更新し忘れる」ことや、逆に「DOM要素を削除したけどデータの更新を忘れた」ということが容易に起こりえます。

### データバインディング時代
その問題を解消するため、Angular.jsを始めとしたデータバインディング系フレームワークが流行しました。
直接のDOM操作をプログラマから隠蔽し、データの内容が常にDOMに反映されるようになりました。Angularでは2WayBindingという方式が採用され、
たとえばTextareaに文字を入力すると対応するデータが更新されるといった、Viewからデータを更新する機能を備えています。

```html
<ul ng-repeat="item in items">
  {{ item.name }}
</ul>
```

プログラマはDOMの操作から解放され、よりロジックの部分に集中出来るようになりました。

### React/flux
そして最後に登場するのがReactとfluxです。ReactにはAngularで問題となっていたパフォーマンスの改善という側面も強いですが、今回はデータフローについての特徴を見ていきます。

Reactには以下の特徴があります
* コンポーネントは親から子へデータを受け渡す(逆は不可)
* データ=>Viewへの1Way Binding

親から子へ、データからViewへの1方向のデータフローは複雑性を排除する事が目的です。データの流れを単純化することでプログラムがどう動くのか、ある時点でのデータ・Viewの状態
が予測しやすいものになります。

fluxの思想もここから生まれており、データの流れを1方向にすることで明瞭なプログラムを書くことを目指しています。

## flux概要


## Redux


## サンプル

```
$ npm install
$ npm start
```
