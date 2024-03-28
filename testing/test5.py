from selenium import webdriver  
from selenium.webdriver.common.by import By  
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select  
import time

chrome_driver_path = "C:\\Users\\MEET PATEL\\chromedriver-win64\\chromedriver.exe"
driver = webdriver.Chrome(executable_path=chrome_driver_path)

driver.get("http://127.0.0.1:3000/")
driver.fullscreen_window()
time.sleep(3) 
driver.find_element(By.ID,"login").send_keys(Keys.ENTER)  
driver.fullscreen_window()
time.sleep(3)
driver.find_element(By.NAME,"email").send_keys("alice@gmail.com") 
time.sleep(3)
driver.find_element(By.NAME,"password").send_keys("alice123")
time.sleep(3)
driver.find_element(By.ID,"submit").send_keys(Keys.ENTER)  
driver.fullscreen_window()
time.sleep(7)
driver.find_element(By.NAME,"question-link").click() 
time.sleep(5) 
driver.find_element(By.ID,"ask-question").send_keys(Keys.ENTER) 
time.sleep(5) 
driver.find_element(By.NAME,"question_title").send_keys("Fertilizer") 
time.sleep(5)
driver.find_element(By.NAME,"question").send_keys("What is NPK Fertilizer ?")
time.sleep(5)
driver.find_element(By.ID,"submit").send_keys(Keys.ENTER)  
driver.fullscreen_window()
time.sleep(10) 
