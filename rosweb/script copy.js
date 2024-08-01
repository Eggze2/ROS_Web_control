document.addEventListener('DOMContentLoaded', (event) => {
    // 使用 GSAP 添加动画效果
    gsap.to(".left-menu", {duration: 1, x: 0, opacity: 1});
    gsap.to(".bottom-bar", {duration: 1, y: 0, opacity: 1, delay: 0.5});
    gsap.to(".charts", {duration: 1, y: 0, opacity: 1, delay: 1});

    // Signal Quality Chart
    const signalQualityCtx = document.getElementById('signalQualityChart').getContext('2d');
    const signalQualityChart = new Chart(signalQualityCtx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            datasets: [{
                label: 'Signal Quality',
                data: [70, 80, 90, 60, 85, 75, 95],
                backgroundColor: 'rgba(0, 183, 255, 0.6)', 
                borderColor: 'rgba(0, 183, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 255, 255, 0.7)',
                hoverBorderColor: 'rgba(0, 255, 255, 1)',
                hoverBorderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#00FFC6',
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#00FFC6',
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#00FFC6',
                        font: {
                            size: 18
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });

    // Data Rate Chart
    const dataRateCtx = document.getElementById('dataRateChart').getContext('2d');
    const dataRateChart = new Chart(dataRateCtx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            datasets: [{
                label: 'Data Rate',
                data: [50, 55, 65, 45, 70, 60, 85],
                backgroundColor: 'rgba(0, 183, 255, 0.6)',
                borderColor: 'rgba(0, 183, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 255, 255, 0.7)',
                hoverBorderColor: 'rgba(0, 255, 255, 1)',
                hoverBorderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#00FFC6',
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#00FFC6',
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#00FFC6',
                        font: {
                            size: 18
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });

    // Link 1 Status Chart
    const linkStatusCtx = document.getElementById('linkStatusChart').getContext('2d');
    const linkStatusChart = new Chart(linkStatusCtx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            datasets: [{
                label: 'Link 1 Status',
                data: [85, 75, 70, 90, 65, 55, 95],
                backgroundColor: 'rgba(0, 183, 255, 0.6)',
                borderColor: 'rgba(0, 183, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 255, 255, 0.7)',
                hoverBorderColor: 'rgba(0, 255, 255, 1)',
                hoverBorderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#00FFC6',
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#00FFC6',
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#00FFC6',
                        font: {
                            size: 18
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });

    // ECharts 仪表盘
    var gaugeContainer = document.getElementById('gauge-container');
    var gaugeChart = echarts.init(gaugeContainer);
    var option = {
        series: [
            {
                name: 'Gauge',
                type: 'gauge',
                min: 0,
                max: 100,
                detail: {formatter: '{value}%'},
                data: [{value: 45, name: 'System Load'}],
                axisLine: {
                    lineStyle: {
                        color: [[0.2, '#FF0000'], [0.8, '#00FFC6'], [1, '#00FF00']],
                        width: 10
                    }
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    length: '70%',
                    width: 3
                }
            }
        ]
    };
    gaugeChart.setOption(option);
});
