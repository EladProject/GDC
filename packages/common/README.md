# The common package of the Generic Data Collectors framework

# Generic Data Collector

There are many methods to retrieve digital information from the web (e.g. http(s),ftp,pop3,imap,SOAP,REST etc.).
The Generic Data Collector (GDC) is a framework for collecting data from various digital sources.


#### Standard API
Standard APIs for all aspects involved in the data collection process
This includes the collector configuration, the collection itself, processing the received data, error, notification and progress reporting.

#### Extendability
The framework supplies the basic classes and interfaces for data collection as well as implementations implementations for several methods.
These classes can be extended and/or implemented to facilitate new functionality for a new or existing method.

#### Dynamic collection of multiple items
The main design goal is to allow collection of several items at one collection. The items to be collected is detemined at configuration time or dynamically at collection time according to filters. An example is collecting several files from FTP according to wildcard matching.

### Design
At the heart of the framework is a collector object (an instance of a GDCCollector subclass), which facilitates a specific data collection method. The collector object receives a configuration object which describes all the information needed to collect the data (e.g. connection details, credentials, what information to retrieve) and how to handle the results. The 
framework also defines a standard interfaces for error handling,logging and progress reporting.

### The common package
Contains the common base classes and interfaces for the data collectors, data receivers and notification handlers

The modules includes the following:
1) This package defines the base class for a collector (GDCCollector). Spcific collectors should derive from it.
2) Common collector logic (implemented in the GDCCollector base class)
3) Base class for data recievers and common data recievers
4) Base class for notification handlers and common notification handlers

