# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

SELECT ProductName, CategoryName
FROM Products
JOIN Categories
ON products.categoryID = categories.categoryID;

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

SELECT OrderID, ShipperName
FROM Orders AS o
JOIN Shippers AS s
ON o.ShipperID = s.ShipperID
WHERE o.OrderDate < '1997-01-09';

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

SELECT ProductName, Quantity
FROM OrderDetails AS o
JOIN Products AS p
ON p.productID = o.productID
WHERE o.OrderID = '10251'
ORDER BY ProductName;

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

SELECT OrderID, CustomerName AS CustomerFullName, LastName AS EmployeeLastName
FROM Orders AS o
JOIN Customers AS c
ON o.CustomerID = c.CustomerID
JOIN Employees AS e
ON o.EmployeeID = e.EmployeeID
ORDER BY CustomerName;

### (Stretch) Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

SELECT CategoryName, ProductName, COUNT(ProductName) AS Count
FROM Categories AS c
JOIN PRODUCTS AS p
ON c.categoryID = p.categoryID
GROUP BY CategoryName;

### (Stretch) Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT o.orderID, SUM(ord.Quantity) AS ItemCount
FROM Orders AS o
INNER JOIN OrderDetails AS ord
ON o.orderID = ord.orderID
GROUP BY ord.orderID
