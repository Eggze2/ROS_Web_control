document.addEventListener('DOMContentLoaded', (event) => {
    // 使用 GSAP 添加动画效果
    gsap.to(".left-menu", { duration: 1, x: 0, opacity: 1 });
    gsap.to(".bottom-bar", { duration: 1, y: 0, opacity: 1, delay: 0.5 });
    gsap.to(".charts", { duration: 1, y: 0, opacity: 1, delay: 1 });

    // 初始化 ECharts 图表
    // 初始化 ECharts 图表
    const initECharts = () => {
        // 通用图表主题配置
        const commonChartThemes = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                axisTick: { alignWithLabel: true },
                axisLine: {
                    lineStyle: {
                        color: '#eee',
                        width: 2
                    }
                },
                axisLabel: {
                    color: '#eee',
                    fontSize: 14
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#eee',
                        width: 2
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#333',
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    color: '#eee',
                    fontSize: 14
                }
            }
        };

        // 信号质量图
        const signalQualityChart = echarts.init(document.getElementById('signalQualityChart'));
        let signalQualityOption = {
            ...commonChartThemes,
            title: { text: 'Signal Quality', left: 'center', textStyle: { color: '#00FFC6', fontSize: 16 } },
            series: [{
                name: 'Signal Quality',
                type: 'bar',
                barWidth: '60%',
                data: [70, 80, 90, 60, 85, 75, 95],
                itemStyle: { color: '#37A2DA' }
            }]
        };
        signalQualityChart.setOption(signalQualityOption);

        // 数据速率图
        const dataRateChart = echarts.init(document.getElementById('dataRateChart'));
        let dataRateOption = {
            ...commonChartThemes,
            title: { text: 'Data Rate', left: 'center', textStyle: { color: '#00FFC6', fontSize: 16 } },
            yAxis: {
                ...commonChartThemes.yAxis,
                axisLabel: { formatter: '{value} Mbps' }
            },
            series: [{
                name: 'Data Rate',
                type: 'bar',
                data: [50, 55, 65, 45, 70, 60, 85],
                itemStyle: { color: '#67E0E3' }
            }]
        };
        dataRateChart.setOption(dataRateOption);

        // 链接状态图
        const linkStatusChart = echarts.init(document.getElementById('linkStatusChart'));
        let linkStatusOption = {
            ...commonChartThemes,
            title: { text: 'Link Status', left: 'center', textStyle: { color: '#00FFC6', fontSize: 16 } },
            series: [{
                name: 'Link Status',
                type: 'bar',
                data: [85, 75, 70, 90, 65, 55, 95],
                itemStyle: { color: '#FFDB5C' }
            }]
        };
        linkStatusChart.setOption(linkStatusOption);
    };

    // 初始化仪表盘
    // 初始化ECharts仪表盘
    const initGauges = () => {
        const ids = ['temperature-gauge', 'voltage-gauge', 'current-gauge', 'speedometer', 'altitude-gauge', 'direction-gauge', 'signal-strength-chart', 'frequency-gauge', 'link-quality-gauge'];
        const values = [25, 16.1, 0.449, 60, 0.6, 224, 85, 1416, 97]; // 实际值列表
        ids.forEach((id, index) => {
            const gaugeChart = echarts.init(document.getElementById(id));
            let option = {
                series: [{
                    type: 'gauge',
                    radius: '90%', // 调整仪表盘大小
                    detail: {
                        formatter: '{value}%',
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bolder',
                        offsetCenter: [0, '60%'] // 调整数据位置
                    },
                    axisLine: {
                        lineStyle: {
                            width: 10,
                            color: [[0.3, '#ff4500'], [0.7, '#ff8c00'], [1, '#32cd32']] // 调整仪表盘颜色
                        }
                    },
                    pointer: {
                        length: '60%',
                        width: 5
                    },
                    data: [{ value: values[index], name: 'Performance' }]
                }]
            };
            gaugeChart.setOption(option);
        });
    };

    initECharts();
    initGauges();
});
