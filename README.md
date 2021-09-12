# 大学ポリシー検索ツール
各大学の定めるポリシーを簡単に検索できるアプリケーションです。<br>
受験生に後悔のない進路選択をして欲しい。という願いを込めて作成しました。<br>
進路選択の判断材料としてご活用いただけます。<br>
お気に入り機能を実装しており、気になった大学のデータはストックしておくことが可能です。


<img width="1440" alt="スクリーンショット 2021-09-12 16 54 10" src="https://user-images.githubusercontent.com/77914934/132985974-ba06489f-e3f6-4233-a9ae-b923f6976748.png">
アプリURL:  https://univpolicy.net<br>
アプリの詳細な説明: https://qiita.com/asameshi/items/3f54da0cbe88bc74f295<br>
（大学のポリシーとは何か、など詳しく説明しております。併せてご確認いただけますと幸いです。）

## 使用技術

・PHP 7.3<br>
・Laravel 8.45<br>
・javaScript<br>
・vue@2.6.14<br>
・vuetify@2.5.3<br>
・mysql Ver 8.0.23<br>
・AWS(・VPC・EC2・RDS・IAM・Route53・ELB・ACM)<br>
・phpMyAdmin<br>
・VirtualBox<br>

## ER図
![ER図 (完成版)](https://user-images.githubusercontent.com/77914934/132987082-df4127d0-e467-417d-945a-862b7905ed82.png)

## インフラ構成図
![test](https://user-images.githubusercontent.com/77914934/132987843-463caa16-cb6b-460f-a6d4-94caef101fad.png)

## 機能一覧
ログイン機能（Laravel Auth）<br>
大学の検索機能<br>
ポリシーの表示機能<br>
お気に入り追加機能（Ajax）<br>
お気に入り削除機能（Ajax）<br>
ご指摘・ご意見等投稿機能（formrun使用）<br>

