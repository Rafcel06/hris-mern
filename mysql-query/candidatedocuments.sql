
CREATE TABLE `candidatedocuments` (
  `DocumentID` int(11) NOT NULL,
  `CandidateID` int(11) DEFAULT NULL,
  `DocumentType` enum('Resume','Cover Letter','ID Proof','Portfolio','Other') NOT NULL,
  `FilePath` varchar(255) NOT NULL,
  `UploadDate` date NOT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidatedocuments`
--
ALTER TABLE `candidatedocuments`
  ADD PRIMARY KEY (`DocumentID`),
  ADD KEY `CandidateID` (`CandidateID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidatedocuments`
--
ALTER TABLE `candidatedocuments`
  MODIFY `DocumentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidatedocuments`
--
ALTER TABLE `candidatedocuments`
  ADD CONSTRAINT `candidatedocuments_ibfk_1` FOREIGN KEY (`CandidateID`) REFERENCES `candidates` (`CandidateID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
