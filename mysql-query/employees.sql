CREATE TABLE `employees` (
  `EmployeeID` int(11) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `MiddleName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `EmergencyPhoneNumber` varchar(255) DEFAULT NULL,
  `CurrentAddress` varchar(255) DEFAULT NULL,
  `PermanentAddress` varchar(255) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `HireDate` date NOT NULL,
  `JobTitle` varchar(50) DEFAULT NULL,
  `DepartmentID` int(11) DEFAULT NULL,
  `Salary` decimal(10,2) DEFAULT NULL,
  `Status` enum('Active','Inactive','On Leave','Terminated') DEFAULT 'Active',
  `Currency` varchar(10) DEFAULT 'USD',
  `Country` varchar(50) DEFAULT NULL,
  `EmploymentType` enum('Full-Time','Part-Time','Contract','Internship') DEFAULT 'Full-Time',
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`EmployeeID`, `FirstName`, `MiddleName`, `LastName`, `Email`, `EmergencyPhoneNumber`, `CurrentAddress`, `PermanentAddress`, `Phone`, `HireDate`, `JobTitle`, `DepartmentID`, `Salary`, `Status`, `Currency`, `Country`, `EmploymentType`, `Password`) VALUES
(4, 'Super', NULL, 'Admin', 'admin@gmail.com', NULL, NULL, NULL, '09928389941', '0000-00-00', 'Software Engineer', 1, NULL, 'Active', 'USD', 'Philippines', '', '$2a$10$v3WOxB.6HDfNqegXvTHCMuw22isZj7dqN4Mtd5081md1k7AC9pN4.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EmployeeID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `DepartmentID` (`DepartmentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`DepartmentID`) REFERENCES `departments` (`DepartmentID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
