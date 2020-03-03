import React, {Component} from 'react';
import axios from 'axios';
import {API_KEY} from "../../API/consts";


class StocksManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockSymbol: 'MSFT',
            stockDailyData: null,
            stockIntradayData: null,
            changePercentageArr: null,
            changeUSD: null,

        }
    }

    componentDidMount() {
        const {stockSymbol} = this.state;
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`)
            .then(res => {
                const stockDailyData = res.data['Time Series (Daily)'];
                const dates = Object.keys(stockDailyData)
                const diffs = []
                for(let i=0; i < dates.length - 1 ; i++) {
                    const newPrice = Number(stockDailyData[dates[i]]['4. close'])
                    const oldPrice = Number(stockDailyData[dates[i+1]]['4. close'])
                    const diffPercentage = this.calcDiffPercentage(oldPrice, newPrice).toFixed(2)
                    diffs.push(diffPercentage)
                    this.setState({changePercentageArr: diffPercentage});
                    // console.log('calcDiffPercentage', oldPrice, newPrice, diffPercentage);

                }
                console.log('diffPercentage', diffs);
                console.log('stockDailyData', stockDailyData);
            })
    }

    calcDiffPercentage = (oldPrice, newPrice) => (
        ((newPrice - oldPrice)/oldPrice)*100
    )

    calcUSDDiff = (oldPrice, newPrice) => (
        newPrice - oldPrice
    )

    render() {
        return (
            <div>
                Stocks Manager
            </div>
        );
    }
}

export default StocksManager;
