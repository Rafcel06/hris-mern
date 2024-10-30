
CREATE TABLE `candidates` (
  `CandidateID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `Resume` text DEFAULT NULL,
  `Position` varchar(50) NOT NULL,
  `ApplicationDate` date NOT NULL,
  `Status` enum('Applied','Interview Scheduled','Interview Completed','Offer Made','Hired','Rejected') DEFAULT 'Applied',
  `InterviewDate` date DEFAULT NULL,
  `Interviewer` varchar(50) DEFAULT NULL,
  `Feedback` text DEFAULT NULL,
  `HiringManagerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`CandidateID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `HiringManagerID` (`HiringManagerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `CandidateID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`HiringManagerID`) REFERENCES `employees` (`EmployeeID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
