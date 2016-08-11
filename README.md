# time-service

#getTimeInCountByPersonType
url request format:
/api/time/get-count-by-person-type/:dateFrom/:dateTo?personType=Student,Visitor,Faculty 

date format: yyyy-mm-dd

response json format: 
{
  "Faculty": 1,
  "Student": 1,
  "Visitor": 1
}

response: getTimeInCountByTime
{
	"Student" : [100,33,58,43,87,31,22,17,13,9,5],
	"Faculty" : [23,53,67,58,89,22,43,56,12,25,1],
	"Visitor" : [0,0,0,5,3,0,6,10,23,17,11]
}

