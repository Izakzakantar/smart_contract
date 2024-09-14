CREATE TABLE Users (
  user_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(15),
  userType ENUM('Donor', 'Beneficiary') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
);

CREATE TABLE Wallets (
  wallet_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),  
  balance FLOAT NOT NULL,                           
  address VARCHAR(255) UNIQUE NOT NULL,                    
  user_id CHAR(36),                                 
  smartcontract_id CHAR(36),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_contract FOREIGN KEY (smartcontract_id) REFERENCES SmartContracts(contract_id)
);

CREATE TABLE Donors (
  donor_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),  
  first_name VARCHAR(100) NOT NULL,               
  email VARCHAR(100) NOT NULL UNIQUE,
  user_id CHAR(36),  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Beneficiaries (
  beneficiary_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),  
  first_name VARCHAR(100) NOT NULL,                      
  address VARCHAR(255) UNIQUE NOT NULL,                         
  phone VARCHAR(15),
  user_id CHAR(36),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Donations (
  donation_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),    
  date_of_donation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  donation_type VARCHAR(50) NOT NULL,                  
  amount FLOAT NOT NULL,                                
  remark VARCHAR(255),                                  
  donor_id CHAR(36),                                    
  CONSTRAINT fk_donor FOREIGN KEY (donor_id) REFERENCES Donors(donor_id) ON DELETE CASCADE
);

CREATE TABLE Transactions (
  transaction_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),  
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  transaction_type ENUM('Send', 'Receive') NOT NULL,    
  amount FLOAT NOT NULL,                                 
  wallet_id CHAR(36),                                    
  beneficiary_id CHAR(36),   
  smartcontract_id CHAR(36),
  CONSTRAINT fk_wallet FOREIGN KEY (wallet_id) REFERENCES Wallets(wallet_id) ON DELETE CASCADE,
  CONSTRAINT fk_beneficiary FOREIGN KEY (beneficiary_id) REFERENCES Beneficiaries(beneficiary_id) ON DELETE CASCADE,
  CONSTRAINT fk_contract2 FOREIGN KEY (smartcontract_id) REFERENCES SmartContracts(contract_id)
);


CREATE TABLE Receipts (
  receipt_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),       
  receipt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       
  pdf_file LONGBLOB                                      
);

CREATE TABLE SmartContracts (
  contract_id CHAR(36) PRIMARY KEY DEFAULT (UUID()), 
  contract_address VARCHAR(255) NOT NULL UNIQUE,      
  deployment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  description VARCHAR(255)                            
);
