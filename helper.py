width=-1
height=-1
old_monitor_width=-1
monitor_width=-1
while True:
    inpt=(input("Enter old width: "))
    if inpt == '': inpt=width
    width=float(inpt)
    inpt=(input("Enter old height: "))
    if inpt == '': inpt=height
    height=float(inpt)
    inpt=(input("Enter old monitor width: "))
    if inpt == '': inpt=old_monitor_width
    old_monitor_width=float(inpt)
    inpt=(input("Enter new monitor width: "))
    if inpt == '': inpt=monitor_width
    monitor_width=float(inpt)
    new_width = round((width/old_monitor_width)*monitor_width)
    new_height = round((height/width)*new_width)
    print("width: "+str(new_width)+"px;")
    print("height: "+str(new_height)+"px;")
    print()
    