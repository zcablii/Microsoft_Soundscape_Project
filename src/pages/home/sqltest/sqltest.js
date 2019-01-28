var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Terry Database in Azure Create connection to database
var config =
{
    userName: 'terryserverapple', // update me
    password: 'Abcd1234', // update me
    server: 'terryserverapple.database.windows.net', // update me
    options:
    {
        database: 'TerryApple', //update me
        encrypt: true
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            //queryDatabase()
            functionTerry()
        }
    }
);

function queryDatabase()
{
    console.log('Reading rows from the Table...');
    console.log('\nTerry print NEW LINE!!!!');
    console.log('\n\nTerry print another NEW LINE!!!!');

    // Read all rows from table
    var request = new Request(
        "SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc "
            + "JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}


function functionTerry1()
{
    console.log('This is the Terry Function 1.');
    console.log('\nNEW LINE 1 !!!!');

    // Read all rows from table
    var request = new Request(
        "SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc "
            + "JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function functionTerry2()
{
    console.log('This is the Terry Function 2 .');
    console.log('\nNEW LINE 2!!!!');

    // Read all rows from table
    var request = new Request(
        "SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc "
            + "JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function functionTerry3()
{
    console.log('This is the Terry Function 3.');
    console.log('\nNEW LINE  3  !!!!');

    // Read all rows from table
    var request = new Request(
        "SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc "
            + "JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}