import torch
import requests
import torchvision.models as models
import torch.nn as nn
from flask import Flask
from flask import jsonify, request
from flask_cors import CORS, cross_origin#crosの設定
from torchvision.transforms import transforms
from PIL import Image

app = Flask(__name__)
CORS(app)  # CORSを有効化する

# CORS追加
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

# モデルの読み込み
# モデルのインスタンスを作成
model = models.vgg11(weights=None)
model.classifier[6] = nn.Linear(4096, 10)
# パラメータを読み込む
model.load_state_dict(torch.load('model.pth', map_location=torch.device('cpu')))
model.eval()

# 画像の前処理
preprocess = transforms.Compose([
    transforms.Resize(256),  # 短い方の辺を256に
    transforms.CenterCrop(224),  # 辺の長さが224の正方形を中央から切り抜く
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.route('/image/judgement', methods=['POST'])
def judgement():
    # POSTリクエストのデータを取得
    data = request.get_json()

    print(data)

    # 受け取ったデータを処理
    image_url = data.get('image_url')  # POSTデータから特定のキーを取得する例

    # print(image_url)

    # 画像を取得
    response = requests.get("http://localhost:3000/images/"+image_url)

    # 画像を一時ファイルとして保存
    with open('temp_image.png', 'wb') as file:
        file.write(response.content)

    # print(response.content)

    # 画像の判定処理などを実行
    result = process_image()

    print(result)

    return str(result)


def process_image():
    # 画像の処理などを実装してください
    # リクエストで受け取った画像データを取得
    image = Image.open('temp_image.png')  # 一時ファイルを開く
    # 画像の加工処理などを行う
    image = image.convert('RGB')  # 画像をRGB形式に変換

    # 画像の前処理
    image = preprocess(image)
    image = image.unsqueeze(0)  # バッチ次元を追加

    # モデルに画像を入力し、予測を行う
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        prediction = predicted.item()

    # 予測結果を返す
    return prediction

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)

  #CIFER10のラベル
  # 0:airplane
  # 1:automobile
  # 2:bird
  # 3:cat
  # 4:deer
  # 5:dog
  # 6:frog
  # 7:horse
  # 8:ship
  # 9:truck
