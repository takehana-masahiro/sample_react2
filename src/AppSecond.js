import './App.css';
import React, { Component } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

class AppSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {searchKeyWord: "",
                  name: "name",
                  resultList: [],
                  resultData: Object,
                  searchFlg: false,
                  flavor: "",
                  searchName: "",
                  shinyFlg: false,
                  message: "message",
                  user: props.user,
                 };

    this.onSearch = this.onSearch.bind(this);
    this.changeShiny = this.changeShiny.bind(this);
  }

  changeShiny() {
    const shinyFlg = this.state.shinyFlg;
    this.setState(state => ({
      shinyFlg: !shinyFlg,
    }));
  }

  onSearch() {
    const key = this.state.searchKeyWord;
    const user = this.state.user;
    alert(key);

    // ユーザープールの設定
    const poolData = {
      UserPoolId : user.aws_user_pools_id,
      ClientId : user.aws_user_pools_web_client_id
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const idToken = userPool.storage["CognitoIdentityServiceProvider.1v05drvqifbhol57ls7qrvc3o8.sample2.idToken"];

    this.setState(state => ({
      searchName: "",
      shinyFlg: false,
    }));

    // ajax

    // fetch

    fetch('https://ofslzm7pbd.execute-api.ap-northeast-1.amazonaws.com/sample0902/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Headers': '*',
        //'Access-Control-Allow-Origin': '*',
        'Authorization': idToken,
      },
      body: ''
    })
    .then(res => res.json())
    .then(res => {
      const results = res;
      const message = results;
      this.setState(state => ({
        message: message,
      }));
      console.log(message);
     })
     .catch(error => {
      console.log(key + "ないです");
     });

  }

  render() {
    return(
      <>
      <div className="AppSecond">
        <div>
          <img src="https://joeschmoe.io/api/v1/random" alt="サムネイル" width="10%" height="10%" />
          {this.state.name}は何を表示するのか。
        </div>
        <input type="text" id="searchKeyWord" placeholder='検索ワード'
               value={this.state.searchKeyWord} onChange={(e) => this.setState({searchKeyWord: e.target.value})} />
        <button onClick={this.onSearch}>検索</button>
        <div>
        {this.state.message}
        </div>
        <AmplifySignOut />
      </div>
      <style>{`
        .AppSecond {
          text-align: center;
        }
      
        .App-logo {
          height: 40vmin;
          pointer-events: none;
        }
      
        @media (prefers-reduced-motion: no-preference) {
          .App-logo {
            animation: App-logo-spin infinite 20s linear;
          }
        }
      
      .App-header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
      }
      
      .App-link {
        color: #61dafb;
      }
      
      @keyframes App-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .table {
        width: 100%;
        border-spacing: 0;
        table-layout: fixed;
        border: solid 1px #444;
      }
      `}

      </style>
      </>
    );
  }
}
export default withAuthenticator(AppSecond);
