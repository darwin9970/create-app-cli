import { defineMock } from '@umijs/max';

export default defineMock({
  'GET /api/analysis/chart': (req, res) => {
    res.json({
      success: true,
      data: {
        xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: [
          {
            name: '销售额',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          },
          {
            name: '访问量',
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      },
      message: 'success'
    });
  }
});
