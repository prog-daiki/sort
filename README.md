# 実装したアルゴリズム

1. **挿入ソート (Insertion Sort)**

   - 小規模データ（10要素以下）に最適
   - 時間計算量: O(n²)
   - 安定ソート

2. **クイックソート (Quick Sort)**

   - 大規模データに最適
   - 時間計算量: 平均 O(n log n)
   - 分割統治法を使用

3. **ハイブリッドソート (Hybrid Sort)**
   - データサイズに応じて最適なアルゴリズムを自動選択
   - 10要素以下: 挿入ソート
   - 11要素以上: クイックソート

# 依存パッケージのインストール

npm install

# テストの実行

npm run test

# カバレッジレポートの生成

npm run test:coverage
