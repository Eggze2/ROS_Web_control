document.addEventListener('DOMContentLoaded', (event) => {
    // 使用 GSAP 添加动画效果
    gsap.to(".left-menu", {duration: 1, x: 0, opacity: 1});
    gsap.to(".bottom-bar", {duration: 1, y: 0, opacity: 1, delay: 0.5});
    gsap.to(".charts", {duration: 1, y: 0, opacity: 1, delay: 1});

    // 初始化 ECharts 图表
    const initECharts = () => {
        const chartThemes = {
            color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#fb7293'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#00FFC6'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#00FFC6'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#083',
                        type: 'dashed'
                    }
                }
            }],
            series: [{
                name: 'Data',
                type: 'bar',
                barWidth: '60%',
                data: []
            }]
        };

        // 配置数据并初始化图表
        ['signalQualityChart', 'dataRateChart', 'linkStatusChart'].forEach((id, index) => {
            const chartInstance = echarts.init(document.getElementById(id), null, {renderer: 'canvas'});
            let option = JSON.parse(JSON.stringify(chartThemes)); // 深复制主题以避免引用问题
            option.series[0].data = [70, 80, 90, 60, 85, 75, 95].map(d => d - index * 10); // 示例数据调整
            chartInstance.setOption(option);
        });
    };

    // 初始化ECharts仪表盘
    const initGauges = () => {
        ['temperature-gauge', 'signal-strength-chart', 'speedometer', 'gauge-container'].forEach(id => {
            const gaugeChart = echarts.init(document.getElementById(id));
            let option = {
                series: [{
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: { show: false },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#464646'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 10
                        }
                    },
                    splitLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { show: false },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}%',
                        color: 'auto'
                    },
                    data: [{ value: Math.random() * 100 }]
                }]
            };
            gaugeChart.setOption(option);
        });
    };

    initECharts();
    initGauges();
});
