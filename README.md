"# GDC" 

    There are many methods to retrieve digital information (e.g. http(s),ftp,pop3,imap,SOAP,REST etc.). 
The Generic Data Collector (GDC) is an extendable genergic data collection library with a standard 
interface for all the different data collection methods.
    At the heart of the library is a collector object, which facilitate a specific data collection method.
The collector object recieves an object which describes all the information needed to collect the data 
(e.g. connection details, credentials, what information to retrieve) and how to output the results. The 
library also defines a standard interface for error handling,logging and progress reporting.