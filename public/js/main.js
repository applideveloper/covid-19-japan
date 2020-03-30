(function() {
  'use strict';

   const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Cz4VBQUwaupGSEdTu-MFS8EcxS4wriaNamxZZcVB4Ok/edit?usp=sharing';

  function drawChart(sheetName, handleQuery) {
    const url = spreadsheetUrl + '&sheet=' + sheetName;
    const query = new google.visualization.Query(url);
    query.send(handleQuery);
  }

  function drawMapForJapanCoronaPatient() {
    const sheetName = 'JapanCoronaPatientMap'
    drawChart(sheetName, handleQueryResponseForJapanCoronaPatientMap);
  }

  function drawMapForJapanCoronaByPrefecture() {
    const sheetName = 'JapanCoronaByPrefecture'
    drawChart(sheetName, handleQueryResponseForJapanCoronaByPrefecture);
  }

  function drawChartForTokyoDailyCoronaChart() {
    const sheetName = 'TokyoDailyCoronaChart'
    drawChart(sheetName, handleQueryResponseForTokyoDailyCoronaChart);
  }

  function drawChartForJapanCoronaPatient() {
    const sheetName = 'JapanCoronaPatientChart'
    drawChart(sheetName, handleQueryResponseForJapanCoronaPatientChart);
  }

  function drawChartForPcr() {
    const sheetName = 'PCR'
    drawChart(sheetName, handleQueryResponseForPCR);
  }

  function drawChartForConsultationCenter() {
    const sheetName = 'PCRbyPrefecture'
    drawChart(sheetName, handleQueryResponseForConsultationCenter);
  }

  function drawChartForAnalysisConsultationCenter() {
    const sheetName = 'AnalysisPCRbyPrefecture'
    drawChart(sheetName, handleQueryResponseForAnalysisConsultationCenter);
  }

  function handleQueryResponseForJapanCoronaPatientMap(response) {
    const target = document.getElementById('JapanCoronaPatientMap');
    var data;
    const options = {
      region: 'JP',
      resolution: 'provinces',
      legend: 'none',
      colorAxis: { colors: ['#ffff00', '#ff0000'] }
    };

    const chart = new google.visualization.GeoChart(target);
    data = response.getDataTable();
    chart.draw(data, options)
  }

  function handleQueryResponseForJapanCoronaByPrefecture(response) {
    const target = document.getElementById('JapanCoronaByPrefecture');
    var data;
    const options = {
      title: '新型コロナウイルス感染症（国内事例）の状況（累積）（無症状病原体保有者を除く）（単位：人）３月28日12：00時点',
      legend: { position: 'top', maxLines: 3 },
      hAxis: {
        title: '陽性者数\n暫定値（順次アップデートされるため、数値が変動する）',
        slantedText: true,
        slantedTextAngle: 90
      },
    };
    const chart = new google.visualization.BarChart(target);
    data = response.getDataTable();
    chart.draw(data, options);
  }

  function handleQueryResponseForJapanCoronaPatientChart(response) {
    const target = document.getElementById('JapanCoronaPatientChart');
    var data;
    const options = {
      title: '日本全国のコロナウィルス感染者数の累計の推移\n(クルー船船上員・乗客と空港検疫を除く)',
      legend: { position: 'top', maxLines: 3 },
      hAxis: {
        title: '日付\n暫定値（順次アップデートされるため、数値が変動する）',
        format: 'MM/dd',
        slantedText: true,
        slantedTextAngle: 90
      },
    };
    const chart = new google.visualization.LineChart(target);
    data = response.getDataTable();
    chart.draw(data, options);
  }

  function handleQueryResponseForTokyoDailyCoronaChart(response) {
    const target = document.getElementById('TokyoDailyCoronaChart');
    var data;
    const options = {
      legend: { position: 'top', maxLines: 3 },
      hAxis: {
        title: '日付\n暫定値（順次アップデートされるため、数値が変動する）',
        format: 'MM/dd',
        slantedText: true,
        slantedTextAngle: 90
      },
    };
    const chart = new google.visualization.ColumnChart(target);
    data = response.getDataTable();
    chart.draw(data, options);
  }

  function handleQueryResponseForPCR(response) {
    const target = document.getElementById('PCR');
    var data;
    const options = {
      title: '国内における新型コロナウィルスに係るPCRの検査の実施状況\n(期間2/13~3/22)',
      legend: { position: 'top', maxLines: 6 },
      vAxis: {
        title: 'PCRの実施件数'
      },
      hAxis: {
        title: '日付\n暫定値（３月22日までに自治体等から回答があった数の合計であり、\n順次アップデートされるため、数値が変動する：３月23日集計）',
        format: 'MM/dd',
        slantedText: true,
        slantedTextAngle: 90
      },
    };
    const chart = new google.visualization.LineChart(target);
    data = response.getDataTable();
    chart.draw(data, options);
  }

  function handleQueryResponseForConsultationCenter(response) {
    const target = document.getElementById('ConsultationCenter');
    var data;
    const options = {
      title: '帰国者・接触者相談センターの相談件数等(都道府県別)\n(期間2月1日~3月19日) 以下、帰国者・接触者を省略',
      legend: { position: 'top', maxLines: 3 },
      vAxis: {
        title: '都道府県'
      },
      hAxis: {
        title: '件数\n(注)暫定値(3月20日までに都道府県から報告された数の合計であり、\n順次アップデートされるため、数値が変動する)',
        slantedText: true,
        slantedTextAngle: 90
      },
    };
    const chart = new google.visualization.BarChart(target);
    data = response.getDataTable();
    chart.draw(data, options);
  }

  function handleQueryResponseForAnalysisConsultationCenter(response) {
    const target = document.getElementById('AnalysisConsultationCenter');
    var data;
    const options = {
      title: '帰国者・接触者相談センターの相談件数等(都道府県別)の割合(期間2月1日~3月19日) ',
      legend: { position: 'top', maxLines: 3, textStyle: { fontSize: 12 } },
      vAxis: {
        title: '都道府県'
      },
      hAxis: {
        title: 'パーセント(%)\n(注)暫定値(3月20日までに都道府県から報告された数の合計であり、順次アップデートされるため、数値が変動する)\n相談=帰国者・接触者相談センター相談の略\n外来=帰国者・接触者外来の略',
        format: 'percent',
        slantedText: true,
        slantedTextAngle: 90
      },
    };
    const chart = new google.visualization.BarChart(target);
    data = response.getDataTable();
    chart.draw(data, options);
  }

  google.charts.load('current', {packages: ['corechart', 'geochart'], 'language': 'ja'});
  google.charts.setOnLoadCallback(drawMapForJapanCoronaPatient);
  google.charts.setOnLoadCallback(drawMapForJapanCoronaByPrefecture);
  google.charts.setOnLoadCallback(drawChartForTokyoDailyCoronaChart);
  google.charts.setOnLoadCallback(drawChartForJapanCoronaPatient);
  google.charts.setOnLoadCallback(drawChartForPcr);
  google.charts.setOnLoadCallback(drawChartForConsultationCenter);
  google.charts.setOnLoadCallback(drawChartForAnalysisConsultationCenter);

  window.onresize = function() {
    drawMapForJapanCoronaPatient();
    drawMapForJapanCoronaByPrefecture();
    drawChartForTokyoDailyCoronaChart();
    drawChartForJapanCoronaPatient();	
    drawChartForPcr();
    drawChartForConsultationCenter();
    drawChartForAnalysisConsultationCenter();
  }
})();
