const fs = require('fs');
const rootDir = require('../../../helpers/path');
const error = require(`${rootDir}/helpers/error`);

const markupData = require(`${rootDir}/helpers/getData`);

const fileName = __filename.slice(__dirname.length + 1, -3);

/* Get data and filtering frames and location by this function */
exports.getGraphicsMarkupFilteredData = async (req, res, next) => {
    try {
        let in_frame = req.query.in_frame,
            out_frame = req.query.out_frame,
            location = req.query.location,
            paginationStart = req.query.paginationStart,
            paginationEnd = req.query.paginationEnd,
            filterData = null,
            url = 'https://wirewax.s3-eu-west-1.amazonaws.com/CodeTest/graphics-markup-test-data.json';

        const resData = await markupData.retriveData(url);
        let responseArray = resData.data;

        /* Frame filtering */
        responseArray.sort(function (a, b) {
            let data;
            if (in_frame == 'desc') {
                data = b.in_frame - a.in_frame;
            } else if (in_frame == 'asc') {
                data = a.in_frame - b.in_frame;
            } else if (out_frame == 'desc') {
                data = b.out_frame - a.out_frame;
            } else {
                data = a.out_frame - b.out_frame;
            }
            return data
        });

        /* Location finding */
        if (location) {
            filterData = responseArray.filter(function (itm) {
                return (itm.content.location.find((i) => i === location));
            });
        } else {
            filterData = responseArray;
        }

        filterData.slice(paginationStart, paginationEnd);
        
        if (resData) {
            res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: filterData });
            res.end();
        } else {
            res.status(200).json({ status: 2, msg: 'Data not found.' });
            res.end();
        }
    } catch (err) {
        console.log(err);
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Return invalid url or not found url by this function */
exports.pageNotFound404 = async (req, res, next) => {
    res.status(404).json({ status: 1, msg: '404 URL Not Found!' });
    res.end();
}
