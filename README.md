# JavaScript勉強会 #Flux

## コンテンツ
* はじめに
* サンプルの実行手順
* Fluxにたどり着くまでの歴史
* Flux概要
* Redux
* 設計時に気をつけるポイント

## はじめに
[fluxのoverview](https://facebook.github.io/flux/docs/overview.html)にもある通り、Fluxは単方向データフローのアーキテクチャです。

> Flux eschews MVC in favor of a unidirectional data flow. 

Flux自体はただの思想で、世の中にはFluxの思想を取り入れた実装が数多く存在します。今回はその中でも2016年1月現在で最も支持を集めているReduxに触れてみます。

「単方向データフローのアーキテクチャ」と言われてもなかなかピンとこないものです。そういうときは、歴史から追っていきましょう。

## サンプルの実行手順

```
$ git clone https://github.com/KeitaMoromizato/js-study-flux
$ cd js-study-flux
$ npm install
$ npm start
```

上記コマンドを実行後、コンソールに表示されているURLにアクセスするとサンプルページが開きます。
検索欄にGitHubのUsernameを入力すると、publicなレポジトリを一覧表示するサンプルです。

## Fluxにたどり着くまでの歴史
もともとJavaScriptと言えば、Webサイトに動きを付ける程度のものでした。それがajaxや近年のSingle Page Applicationの盛り上がりにより、処理をフロント側に寄せるようになってきました。
そうすると、フロント側にも効率やメンテナンス性を保つため、アーキテクチャが必要になってきます。

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

ajaxによるデータ取得といった任意のタイミングで、プログラマ自身がDOMを書きかえていました。上記の例はシンプルで分かりやすいようにも見えますが、実際のデータとDOMの状態の同期をとるのはプログラマ自身であり、「データが追加されたけどDOMを更新し忘れる」ことや、逆に「DOM要素を削除したけどデータの更新を忘れた」ということが容易に起こりえます。

### データバインディング時代
その問題を解消するため、Angular.jsを始めとしたデータバインディング系フレームワークが流行しました。直接のDOM操作をプログラマから隠蔽し、データの内容が常にDOMに反映されるようになりました。
Angularでは2WayBindingという方式が採用され、データの変更をViewに反映するだけでなく、例えばTextareaに文字を入力すると対応するデータも自動更新されます。

```html
<ul>
  <li ng-repeat="item in items"> {{ item.name }} </li>
</ul>
```

これにより、プログラマは煩雑なDOM操作から開放されました。

### React/Flux
そして2016年1月現在で最も注目を集めているのが、ReactとFluxを組み合わせたアーキテクチャです。ReactにはAngularで問題となっていたパフォーマンスの改善という側面も強いですが、今回はデータフローについての特徴を見ていきます。

Reactには以下の特徴があります
* コンポーネントは親から子へデータを受け渡す(逆は不可)
* データ=>Viewへの1Way Binding

親から子へ、データからViewへの1方向のデータフローは複雑性を排除する事が目的です。データの流れを単純化することでプログラムがどう動くのか、ある時点でのデータ・Viewの状態が予測しやすいものになります。FluxはReactと同様に、単方向のデータフローを実現するため相性が良く、Reactと共に流行の兆しを見せています。

## Flux概要

fluxについて調べていると、以下の図をよく見かけます。

<img src="./docs/flux.png" style="width: 100%;" />

ざっくり説明すると次のような位置付けとなっています。ただ、この説明を見ただけではよく分からないので実際に書いてみるのが一番でしょう。
* Clickイベントなどのユーザアクションが発生したタイミングで、Actionをdispatch(発行)する
* dispatchされたActionは該当するStore(データの保存先)が受け取り、自身が保持するデータを更新する
* Storeの情報が更新されたことがViewに通知され、DOMが更新される

Fluxを使うことで以下のようなメリットが得られます。
* データの保存先をStoreに集約することで管理がしやすくなる
* Storeへの書き込みをdispatcherに統一することで、意図しない変更を防ぐ
* ViewはStoreの変更を検知して更新されるため、Viewの状態を管理しなくてもよい

上記の図には複数の登場人物がいますが、Fluxを実現しているフレームワークによってその表現方法には違いがあります。

## Redux
Reduxは2016年1月現在でGitHub Starを一番多く集めているFlux実装です。
最終的にはどのflux実装を選択するかは自由ですが、情報量や今後のメンテの可能性を考えると一番最初はReduxから入ると良いでしょう。

Reduxが提供するのは主にStoreとDispatcherです。

### Storeの実装
Reduxでは、アプリケーションが１つのStoreを持ちます。Single Page Application(SPA)で構築する際にも単一のStoreを用います。
Storeの処理はひとことで言うと「Actionを受け取り、今の状態(State)を元に新しい状態を作る)ことです。Storeが生成したStateを元にViewはDOMをレンダリングします。
この「今の状態を元に新しい状態を作る」部分をreducerと言います。Stateはただのオブジェクトなので、key-valueの組み合わせになるはずです。そのkey毎にreducerがあると考えて下さい。
もしreducerが複雑になるとき(SPAで複数ドメインのデータを保持する場合など)は、`combineReducers`をネストすることで可読性が向上します。

```js
import { createStore, combineReducers } from 'redux';
import { FETCH_REPOSITORIES } from '../actions/repositoryAction';

function repositories(state = [], action) {
  console.log("handle in Store", action.type, action);
  switch (action.type) {
    case FETCH_REPOSITORIES:
      // 現在のStateを元に、新しいStateを返す
      return state.concat(action.repositories);
    default:
      return state;
  }
}

const reducer = combineReducers({
  // ここでreducerを登録
  repositories
});

export default createStore(reducer);
```

### ActionCreatorの実装
Reduxには含まれていませんが、今回のサンプルではActionCreateを実装しています。ここではajaxレスポンスを契機にActionを発火しています。
簡単なRedux実装であれば、ここはView(React Component)の責務のようです。

```js
import request from 'superagent';

export const FETCH_REPOSITORIES = 'REPOSITORY_ACTION.FETCH_REPOSITORIES';

export class RepositoryAction {
  
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  
  fetch(username) {
    request(`https://api.github.com/users/${username}/repos`, (error, res, body) => {
      if (error) return console.error(error);
      
      console.log('fetch repositories', res.body);
      
      // ここでActionを発火
      this.dispatcher({
        type: FETCH_REPOSITORIES,
        repositories: res.body
      });
    });
  }
}
```

### Viewの実装(Actionの発火側)
Actionを発火する側のComponentです。ポイントは、FormのSubmitイベントでActionCreatorのメソッドを実行しているポイントです。
通常であれば、ここで`this.dispatch()`を直接実行しても構いません。

```js
import React from 'react';
import {connect} from 'react-redux';

import {RepositoryAction} from '../actions/repositoryAction';
import SearchForm from './searchForm';
import RepoList from './repoList';

class TopPage extends React.Component {
  
  componentDidMount() {
    this.repositoryAction = new RepositoryAction(this.props.dispatch);
  }
  
  onSubmit(text) {
    console.log(text);
    // ActionCreatorを呼び出し
    this.repositoryAction.fetch(text);
  }
  
  render() {
    return (
      <div>
        <h1>Repository Finder</h1>
        <SearchForm onSubmit={(text) => this.onSubmit(text)}/>
        <RepoList />
      </div>
    );
  }
}

// StoreをComponentにバインドする
export default connect(state => ({}))(TopPage);
```

### Viewの実装(Stateを参照する)
Stateを元にレンダリングするコードです。最終行で`connect()`を実行している以外は通常のReactコンポーネントです。
connect時に設定したkey(ここではrepositories)がpropsとしてComponentのpropsで参照できます。

```js
import React from 'react';
import {connect} from 'react-redux';

class RepoList extends React.Component {
  
  render() {
    return (
      <ul>
        { this.props.repositories.map(r => <li key={r.id}><a href={r.html_url}>{ r.name }</a></li>) }
      </ul>
    );
  }
}

export default connect(state => ({
  repositories: state.repositories
}))(RepoList);
```

### Provider
ReduxではComponentのTopにProviderを記述して、参照するStoreを設定する必要があります。

```js
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import Store from './stores/store';
import TopPage from './components/topPage';

ReactDOM.render((
  <Provider store={Store}>
    <TopPage />
  </Provider>
), document.getElementById('app'));
```

## 設計時に気をつけるポイント

### ActionCreatorは必要なのか？
Reduxはそこに言及していませんが、個人的には必要だと思います。
Viewがajaxコールまで行ってしまうと直ぐに煩雑になります(いわゆるFat Controller)。ViewはあくまでDOMを構築する事が責務で、その裏でAPIを実行しているのか、実はLocalStorageを参照しているのかといったことは隠蔽してしまった方が良いでしょう。
ただ、ReduxだとViewにdispatcherがバインドされてしまっているため、どうActionCreatorに渡すかが難しいところです。

### どのComponentがStore、dispatcherを参照すべきか
個人的には、utilityコンポーネントはStore(State)を参照するべきではなく、直接ActionをDispatchすべきではありません。これはアプリケーションのドメインによらない設計にすべきでしょう。
commonコンポーネント(システム中の共通部品)がdispatchするのは物によりますが、良いかなと思います(フォローボタンなど)。
