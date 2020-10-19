#!/usr/bin/env python
# coding: utf-8

# In[1]:


# The discountScheme class
# If the num_bids > min_order_qnty

class DiscountSchemeVM:
    def __init__(
                 self,
        
                 category="", 
                 min_order_qnty=0, 
                 original_price=0, 
                 discounted_price=0, 
                 expiry_date=None, 
                 delivery_charge=0, 
                 num_bids = 0):
        
        # Independent variables
        self.category = category
        self.num_bids = num_bids
        self.min_order_qnty = min_order_qnty
        self.expiry_date = expiry_date
        self.original_price = original_price
        self.discounted_price = discounted_price        
        self.delivery_charge = delivery_charge    
        
        # Whether the bid succeeded or not: PENDING, SUCCESS. FAILED
        # If num_bids > min_order_qnty --> SUCCESS
        # elif expiry_date > current_date --> PENDING (still have time to gather bids)
        # elif expiry_date < current_date --> FAILED
        # This is the dependent variable
        self.status = None 

        
    def to_dict(self):
        return self.__dict__
    
    def __str__(self):
        return str(self.to_dict())


# In[2]:


ds = DiscountSchemeVM()
# print(ds.to_dict())


# In[3]:


from random import randrange
from datetime import timedelta, datetime

def random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    random_date = start + timedelta(seconds=random_second)
    return random_date

start_date = datetime.strptime('1/1/2020', '%d/%m/%Y')
end_date = datetime.strptime('31/12/2020', '%d/%m/%Y')


# In[4]:


# print(random_date(start_date, end_date))


# In[5]:


import enum
# Using enum class create enumerations
class Status:
   SUCCESS = "SUCCESS"
   PENDING = "PENDING"
   FAILED = "FAILED"


# In[6]:


from random import randrange
import random

start_date = datetime.strptime('1/1/2020', '%d/%m/%Y')
end_date = datetime.strptime('31/12/2020', '%d/%m/%Y')

def generate_random_discount_scheme(category, 
                                    number_of_items,
                                    min_original_price, max_original_price, 
                                    start_date=start_date, end_date=end_date):
    
    discount_schemes = []    

    for i in range(number_of_items):
        min_order_qnty = random.randrange(1, number_of_items)
        original_price = random.randrange(min_original_price, max_original_price)
        discounted_price = random.randrange(min_original_price-1, max_original_price-1)

        while discounted_price >= original_price:
            discounted_price = random.randrange(min_original_price-1, max_original_price-1)

        expiry_date = random_date(start_date, end_date)
        delivery_charge = random.randrange(1, 20)
        num_bids = random.randrange(1, 20)

        discount_scheme = DiscountSchemeVM(category=category, 
                                           min_order_qnty=min_order_qnty, 
                                           original_price=original_price, discounted_price=discounted_price,
                                           expiry_date=expiry_date, 
                                           delivery_charge=delivery_charge,
                                           num_bids=num_bids)

        # To determine and mock the status of the discount_scheme
        if (discount_scheme.num_bids >= discount_scheme.min_order_qnty):
            discount_scheme.status = str(Status.SUCCESS)
        elif (discount_scheme.expiry_date > datetime.now()):
            discount_scheme.status = str(Status.PENDING)
        else:
            discount_scheme.status = str(Status.FAILED)

        discount_schemes.append(discount_scheme)
    
    return discount_schemes


# In[7]:


discount_schemes = generate_random_discount_scheme("shoe", 20, 100, 200)


# In[8]:


# print(len(discount_schemes))


# In[9]:


for index, discount_scheme in enumerate(discount_schemes):
    if index > 5:
        break
    # print(discount_scheme) 


# In[10]:


shoe_discount_schemes = generate_random_discount_scheme("shoe", 20, 100, 200)
computer_discount_schemes = generate_random_discount_scheme("computer", 20, 1000, 2000)
camera_discount_schemes = generate_random_discount_scheme("camera", 20, 500, 1000)
shirt_discount_schemes = generate_random_discount_scheme("shirt", 20, 50, 200)


# In[11]:


discount_schemes = [*shoe_discount_schemes, *computer_discount_schemes, *camera_discount_schemes, *shirt_discount_schemes]


# In[12]:


# print(len(discount_schemes))


# In[13]:


import pandas as pd


# In[14]:


def random_generate_df():
    shoe_discount_schemes = generate_random_discount_scheme("shoe", 20, 100, 200)
    computer_discount_schemes = generate_random_discount_scheme("computer", 20, 1000, 2000)
    camera_discount_schemes = generate_random_discount_scheme("camera", 20, 500, 1000)
    shirt_discount_schemes = generate_random_discount_scheme("shirt", 20, 50, 200)
    
    discount_schemes = [*shoe_discount_schemes, *computer_discount_schemes, *camera_discount_schemes, 
                        *shirt_discount_schemes]
    
    df = pd.DataFrame.from_records([ds.to_dict() for ds in discount_schemes])
    return df


# In[15]:


df = random_generate_df()


# In[16]:


df.head()


# In[17]:


df.shape


# In[18]:


categories = ['shoe', 'computer', 'camera', 'shirt']


# In[19]:


df_selected_category = df[df['category'] == categories[1]]
df_selected_category.head()


# In[20]:


df_selected_category.shape


# In[ ]:




