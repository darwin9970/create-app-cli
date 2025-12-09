import { Request, Response } from 'express';

const getAnalysisChartData = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        {
          name: 'Sales',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        },
        {
          name: 'Visits',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
  });
};

export default {
  'GET /api/analysis/chart': getAnalysisChartData
};
