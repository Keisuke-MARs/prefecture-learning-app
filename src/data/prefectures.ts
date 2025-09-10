export interface Prefecture {
    id: number;
    name: string;
    capital: string;
    region: string;
}

export const prefectures: Prefecture[] = [
    // 北海道地方
    { id: 1, name: "北海道", capital: "札幌市", region: "北海道" },

    // 東北地方
    { id: 2, name: "青森県", capital: "青森市", region: "東北" },
    { id: 3, name: "岩手県", capital: "盛岡市", region: "東北" },
    { id: 4, name: "宮城県", capital: "仙台市", region: "東北" },
    { id: 5, name: "秋田県", capital: "秋田市", region: "東北" },
    { id: 6, name: "山形県", capital: "山形市", region: "東北" },
    { id: 7, name: "福島県", capital: "福島市", region: "東北" },

    // 関東地方
    { id: 8, name: "茨城県", capital: "水戸市", region: "関東" },
    { id: 9, name: "栃木県", capital: "宇都宮市", region: "関東" },
    { id: 10, name: "群馬県", capital: "前橋市", region: "関東" },
    { id: 11, name: "埼玉県", capital: "さいたま市", region: "関東" },
    { id: 12, name: "千葉県", capital: "千葉市", region: "関東" },
    { id: 13, name: "東京都", capital: "東京", region: "関東" },
    { id: 14, name: "神奈川県", capital: "横浜市", region: "関東" },

    // 中部地方
    { id: 15, name: "新潟県", capital: "新潟市", region: "中部" },
    { id: 16, name: "富山県", capital: "富山市", region: "中部" },
    { id: 17, name: "石川県", capital: "金沢市", region: "中部" },
    { id: 18, name: "福井県", capital: "福井市", region: "中部" },
    { id: 19, name: "山梨県", capital: "甲府市", region: "中部" },
    { id: 20, name: "長野県", capital: "長野市", region: "中部" },
    { id: 21, name: "岐阜県", capital: "岐阜市", region: "中部" },
    { id: 22, name: "静岡県", capital: "静岡市", region: "中部" },
    { id: 23, name: "愛知県", capital: "名古屋市", region: "中部" },

    // 近畿地方
    { id: 24, name: "三重県", capital: "津市", region: "近畿" },
    { id: 25, name: "滋賀県", capital: "大津市", region: "近畿" },
    { id: 26, name: "京都府", capital: "京都市", region: "近畿" },
    { id: 27, name: "大阪府", capital: "大阪市", region: "近畿" },
    { id: 28, name: "兵庫県", capital: "神戸市", region: "近畿" },
    { id: 29, name: "奈良県", capital: "奈良市", region: "近畿" },
    { id: 30, name: "和歌山県", capital: "和歌山市", region: "近畿" },

    // 中国地方
    { id: 31, name: "鳥取県", capital: "鳥取市", region: "中国" },
    { id: 32, name: "島根県", capital: "松江市", region: "中国" },
    { id: 33, name: "岡山県", capital: "岡山市", region: "中国" },
    { id: 34, name: "広島県", capital: "広島市", region: "中国" },
    { id: 35, name: "山口県", capital: "山口市", region: "中国" },

    // 四国地方
    { id: 36, name: "徳島県", capital: "徳島市", region: "四国" },
    { id: 37, name: "香川県", capital: "高松市", region: "四国" },
    { id: 38, name: "愛媛県", capital: "松山市", region: "四国" },
    { id: 39, name: "高知県", capital: "高知市", region: "四国" },

    // 九州・沖縄地方
    { id: 40, name: "福岡県", capital: "福岡市", region: "九州" },
    { id: 41, name: "佐賀県", capital: "佐賀市", region: "九州" },
    { id: 42, name: "長崎県", capital: "長崎市", region: "九州" },
    { id: 43, name: "熊本県", capital: "熊本市", region: "九州" },
    { id: 44, name: "大分県", capital: "大分市", region: "九州" },
    { id: 45, name: "宮崎県", capital: "宮崎市", region: "九州" },
    { id: 46, name: "鹿児島県", capital: "鹿児島市", region: "九州" },
    { id: 47, name: "沖縄県", capital: "那覇市", region: "九州" },
];

export const regions = [
    "北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州"
];