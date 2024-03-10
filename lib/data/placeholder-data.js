const placeholderWeekStats = [
    {
        date: 1708967989000, // current date as a Unix timestamp
        streams: 30, // placeholder number of streams
        uploads: 28, // placeholder number of uploads
    },
    {
        date: 1708967989000 + 86400000, // next day
        streams: 26,
        uploads: 26,
    },
    {
        date: 1708967989000 + 2 * 86400000, // day after next
        streams: 20,
        uploads: 20,
    },
    {
        date: 1708967989000 + 3 * 86400000, // 3 days from now
        streams: 25,
        uploads: 25,
    },
    {
        date: 1708967989000 + 4 * 86400000, // 4 days from now
        streams: 35,
        uploads: 35,
    },
    {
        date: 1708967989000 + 5 * 86400000, // 5 days from now
        streams: 35,
        uploads: 35,
    },
    {
        date: 1708967989000 + 6 * 86400000, // 6 days from now
        streams: 40,
        uploads: 40,
    },
];


const placeholderMonthStats = [
    {
        date: 1704067200000,
        streams: 250,
        uploads: 120,
    },
    {
        date: 1706745600000,
        streams: 300,
        uploads: 150,
    },
];

export const placeholderWeeklyStats = {
    totalRecords: 230,
    previousTotalRecords: 225,
    totalUploads: 200,
    previousTotalUploads: 180,
    stats: placeholderWeekStats
}

export const placeholderYearlyStats = {
    totalRecords: 1230,
    previousTotalRecords: 1000,
    totalUploads: 1225,
    previousTotalUploads: 1022,
    stats: placeholderMonthStats
}

export const placeholderStreamers = [
    {
        id: 1,
        name: '微竞-浪D',
        url: 'https://www.huya.com/196645',
        description: '韩服职业局，混子的春天，咕咕咕',
        avatar: 'https://huyaimg.msstatic.com/avatar/1087/50/0627739a105375f942be5fbfcb4e64_180_135.jpg?1658190347&474756',
        isLive: true,
        isActivated: true,
        platform: 'huya',
    },
    {
        id: 2,
        name: '雪乃荔荔枝',
        description: 'VCTCN 启点赛 blg vs te',
        url: 'https://www.huya.com/273493',
        avatar: 'https://huyaimg.msstatic.com/avatar/1048/dd/cf30c1876ab2a4d893a1d0f0de4a67_180_135.jpg?1649317782&474756',
        isLive: true,
        isActivated: true,
        platform: 'huya',
    },
    {
        id: 3,
        name: '杰米GEmini',
        url: 'https://www.huya.com/geminiii',
        avatar: 'https://huyaimg.msstatic.com/avatar/1026/a3/14396c23a133a57c728f5550ecf0f8_180_135.jpg?1683526023&474756',
        isLive: false,
        isActivated: true,
        lastStream: new Date().getTime() - 1000 * 60 * 60 * 24 * 2,
        platform: 'huya',
    },
    {
        id: 4,
        name: '企鹅 (无畏契约)',
        url: 'https://live.douyin.com/386003334438',
        avatar: 'https://p6.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_b9ca5ea4fe012b6d39dafa46f0219c18.jpeg?from=3067671334',
        isLive: false,
        isActivated: false,
        lastStream: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
        platform: 'douyin',
    },
    {
        id: 5,
        name: '简单咩一下',
        description: '暴龙今天温柔，儿豁',
        url: 'https://live.douyin.com/217536353956',
        avatar: 'https://p26.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_681b15b9fbce96708d2b3a206735d7b6.jpeg?from=3067671334',
        isLive: true,
        isActivated: true,
        platform: 'douyin',
    },
    {
        id: 6,
        name: '小羊仔（无畏契约）',
        description: '春节不休息陪大家过年！',
        url: 'https://live.douyin.com/66407121168',
        avatar: 'https://p26.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_91c6d02d076a3943c80db5664c9541bb.jpeg?from=3067671334',
        isLive: false,
        isActivated: false,
        lastStream: new Date().getTime() - 1000 * 60 * 60 * 24 * 10,
        platform: 'douyin',
    },
    {
        id: 7,
        name: 'DANK1NG',
        description: '●´З｀●',
        url: 'https://www.huya.com/dank1ng',
        avatar: 'https://huyaimg.msstatic.com/avatar/1009/21/d479da7839241ade1e136d7324df4f_180_135.jpg?1671605310&474756',
        isLive: true,
        isActivated: true,
        platform: 'huya',
    },
];


export const placeholderData = [
    {
        id: 1,
        streamTitle: "Stream 1",
        streamer: "Streamer A",
        time: 1645804800000, // February 25, 2022, 00:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream1",
        status: true,
        streamDataId: "1234567890"
    },
    {
        id: 2,
        streamTitle: "Stream 2",
        streamer: "Streamer A",
        time: 1645815600000, // February 25, 2022, 03:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream2",
        status: false,
        streamDataId: "2345678901"
    },
    {
        id: 3,
        streamTitle: "Stream 3",
        streamer: "Streamer C",
        time: 1645826400000, // February 25, 2022, 06:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream3",
        status: true,
        streamDataId: "3456789012"
    },
    {
        id: 4,
        streamTitle: "Stream 4",
        streamer: "Streamer D",
        time: 1645837200000, // February 25, 2022, 09:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream4",
        status: false,
        streamDataId: "4567890123"
    },
    {
        id: 5,
        streamTitle: "Stream 5",
        streamer: "Streamer E",
        time: 1645848000000, // February 25, 2022, 12:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream5",
        status: true,
        streamDataId: "5678901234"
    },
    {
        id: 6,
        streamTitle: "Stream 6",
        streamer: "Streamer F",
        time: 1645858800000, // February 25, 2022, 15:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream6",
        status: true,
        streamDataId: "6789012345"
    },
    {
        id: 7,
        streamTitle: "Stream 7",
        streamer: "Streamer G",
        time: 1645869600000, // February 25, 2022, 18:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream7",
        status: false,
        streamDataId: "7890123456"
    },
    {
        id: 8,
        streamTitle: "Stream 8",
        streamer: "Streamer H",
        time: 1645880400000, // February 25, 2022, 21:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream8",
        status: true,
        streamDataId: "8901234567"
    },
    {
        id: 9,
        streamTitle: "Stream 9",
        streamer: "Streamer I",
        time: 1645891200000, // February 26, 2022, 00:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream9",
        status: false,
        streamDataId: "9012345678"
    },
    {
        id: 10,
        streamTitle: "Stream 10",
        streamer: "Streamer J",
        time: 1645902000000, // February 26, 2022, 03:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream10",
        status: true,
        streamDataId: "0123456789"
    },
    {
        id: 11,
        streamTitle: "Stream 11",
        streamer: "Streamer K",
        time: 1645912800000, // February 26, 2022, 06:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream11",
        status: true,
        streamDataId: "1234567890"
    },
    {
        id: 12,
        streamTitle: "Stream 12",
        streamer: "Streamer L",
        time: 1645923600000, // February 26, 2022, 09:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream12",
        status: false,
        streamDataId: "2345678901"
    },
    {
        id: 13,
        streamTitle: "Stream 13",
        streamer: "Streamer M",
        time: 1645934400000, // February 26, 2022, 12:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream13",
        status: true,
        streamDataId: "3456789012"
    },
    {
        id: 14,
        streamTitle: "Stream 14",
        streamer: "Streamer N",
        time: 1645945200000, // February 26, 2022, 15:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream14",
        status: false,
        streamDataId: "4567890123"
    },
    {
        id: 15,
        streamTitle: "Stream 15",
        streamer: "Streamer O",
        time: 1645956000000, // February 26, 2022, 18:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream15",
        status: true,
        streamDataId: "5678901234"
    },
    {
        id: 16,
        streamTitle: "Stream 16",
        streamer: "Streamer P",
        time: 1645966800000, // February 26, 2022, 21:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream16",
        status: true,
        streamDataId: "6789012345"
    },
    {
        id: 17,
        streamTitle: "Stream 17",
        streamer: "Streamer Q",
        time: 1645977600000, // February 27, 2022, 00:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream17",
        status: false,
        streamDataId: "7890123456"
    },
    {
        id: 18,
        streamTitle: "Stream 18",
        streamer: "Streamer R",
        time: 1645988400000, // February 27, 2022, 03:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream18",
        status: true,
        streamDataId: "8901234567"
    },
    {
        id: 19,
        streamTitle: "Stream 19",
        streamer: "Streamer S",
        time: 1645999200000, // February 27, 2022, 06:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream19",
        status: false,
        streamDataId: "9012345678"
    },
    {
        id: 20,
        streamTitle: "Stream 20",
        streamer: "Streamer T",
        time: 1646010000000, // February 27, 2022, 09:00:00 UTC as a Unix timestamp
        filePath: "/path/to/stream20",
        status: true,
        streamDataId: "0123456789"
    }
];


export const placeholderStreamData = [

    {
        id: 1,
        title: "Stream 1",
        dateStart: 1645804800000,
        dateEnd: 1645815600000,
        outputFilePath: "/path/to/stream1",
        danmuFilePath: "/path/to/danmu1",
        streamerId: 1,
        streamerName: "Streamer A",
        status: true,
    },
    {
        id: 2,
        title: "Stream 2",
        dateStart: 1645815600000,
        dateEnd: 1645826400000,
        outputFilePath: "/path/to/stream2",
        danmuFilePath: "/path/to/danmu2",
        streamerId: 1,
        streamerName: "Streamer A",
        status: false,
    },
    {
        id: 3,
        title: "Stream 3",
        dateStart: 1645826400000,
        dateEnd: 1645837200000,
        outputFilePath: "/path/to/stream3",
        danmuFilePath: "/path/to/danmu3",
        streamerId: 2,
        streamerName: "Streamer B",
        status: true,
    },
    {
        id: 4,
        title: "Stream 4",
        dateStart: 1645837200000,
        dateEnd: 1645848000000,
        outputFilePath: "/path/to/stream4",
        danmuFilePath: "/path/to/danmu4",
        streamerId: 3,
        streamerName: "Streamer C",
        status: false,
    },
    {
        id: 5,
        title: "Stream 5",
        dateStart: 1645848000000,
        dateEnd: 1645858800000,
        outputFilePath: "/path/to/stream5",
        danmuFilePath: "/path/to/danmu5",
        streamerId: 4,
        streamerName: "Streamer D",
        status: true,
    },
    {
        id: 6,
        title: "Stream 6",
        dateStart: 1645858800000,
        dateEnd: 1645869600000,
        outputFilePath: "/path/to/stream6",
        danmuFilePath: "/path/to/danmu6",
        streamerId: 5,
        streamerName: "Streamer E",
        status: true,
    },
    {
        id: 7,
        title: "Stream 7",
        dateStart: 1645869600000,
        dateEnd: 1645880400000,
        outputFilePath: "/path/to/stream7",
        danmuFilePath: "/path/to/danmu7",
        streamerId: 6,
        streamerName: "Streamer F",
        status: false,
    },
    {
        id: 8,
        title: "Stream 8",
        dateStart: 1645880400000,
        dateEnd: 1645891200000,
        outputFilePath: "/path/to/stream8",
        danmuFilePath: null,
        streamerId: 7,
        streamerName: "Streamer G",
        status: true,
    },
    {
        id: 9,
        title: "Stream 9",
        dateStart: 1645891200000,
        dateEnd: 1645902000000,
        outputFilePath: "/path/to/stream9",
        danmuFilePath: null,
        streamerId: 8,
        streamerName: "Streamer H",
        status: false,
    }
]
